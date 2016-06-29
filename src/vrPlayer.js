import React, { Component } from 'react';

require('./styles/vrPlayer.scss');

var gl, mvMatrix, squareVerticesBuffer, vertexPosAttr, shaderProgram, perspectiveMatrix;

export default class VrPlayer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var fragmentScript = document.createElement('script');
    fragmentScript.text = 'void main(void) { gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);}';
    fragmentScript.id = 'shader-fs';
    fragmentScript.type = 'x-shader/x-fragment';
    fragmentScript.async = true;
    document.body.appendChild(fragmentScript);

    var vertexScript = document.createElement('script');
    vertexScript.text = 'attribute vec3 aVertexPosition; uniform mat4 uMVMatrix; uniform mat4 uPMatrix; void main(void) { gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);}';
    vertexScript.id = 'shader-vs';
    vertexScript.type = 'x-shader/x-vertex';
    vertexScript.async = true;
    document.body.appendChild(vertexScript);

    var sylvesterScript = document.createElement('script');
    sylvesterScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/sylvester/0.1.3/sylvester.min.js';
    sylvesterScript.type = 'text/javascript';
    sylvesterScript.async = false;
    document.body.appendChild(sylvesterScript);

    var glUtilsScript = document.createElement('script');
    glUtilsScript.src = 'https://cdn.rawgit.com/mdn/webgl-examples/gh-pages/tutorial/glUtils.js';
    glUtilsScript.type = 'text/javascript';
    glUtilsScript.async = false;
    document.body.appendChild(glUtilsScript);
  }

  componentDidMount() {
    var video = document.getElementById('video');
    video.play();
    var canvas = document.getElementById('vr-player');
    try {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    } catch(e) {
      console.error('Cannot retrieve webgl context, your browser may not support it.');
      gl = null;
    }
    if (gl) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.viewport(0, 0, canvas.width, canvas.height);
      initShaders();
      initBuffers();
      window.setTimeout(drawScene, 1000);
    }
  }

  render() {
    return (
      <section className="vr-player">
        <video id="video" autoplay loop poster="https://thumbs.gfycat.com/FlashySadIndigowingedparrot-size_restricted.gif" preload="auto">
          <source src="https://fat.gfycat.com/FlashySadIndigowingedparrot.mp4" type="video/mp4" />
          Sorry, your browser does not seem to support the <code>&lt;video&gt;</code> element.
        </video>
        <canvas id="vr-player">
          Sorry, your browser does not seem to support the <code>&lt;canvas&gt;</code> element.
        </canvas>
      </section>
    )
  }
}

function initShaders() {
  var fragmentShader = getShader(gl, 'shader-fs');
  var vertexShader = getShader(gl, 'shader-vs');

  shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize shader program');
  }

  gl.useProgram(shaderProgram);

  vertexPosAttr = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
  gl.enableVertexAttribArray(vertexPosAttr);
}

function getShader(gl, id) {
  var shaderScript = document.getElementById(id);
  if (!shaderScript) return null;
  var source = '';
  var curChild = shaderScript.firstChild;
  while (curChild) {
    if (curChild.nodeType === curChild.TEXT_NODE) {
      source += curChild.textContent;
    }
    curChild = curChild.nextSibling;
  }

  var shader;
  if (shaderScript.type === 'x-shader/x-fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type === 'x-shader/x-vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return null;
  }

  return shader;
}

function initBuffers() {
  squareVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  var vertices = [
    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0,
    1.0, -1.0, 0.0,
    -1.0, -1.0, 0.0
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function drawScene() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);
  loadIdentity();
  mvTranslate([-0.0, 0.0, -6.0]);

  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  gl.vertexAttribPointer(vertexPosAttr, 3, gl.FLOAT, false, 0, 0);
  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

/**
 * Matrix utility functions
 */

function loadIdentity() {
  mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
  mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
  multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms() {
  var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

  var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}
