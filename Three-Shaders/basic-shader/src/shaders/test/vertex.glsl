uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;

varying float vRandom;

void main() {

    // Variables
    // float foo = 1.234;
    // int num = 12;
    // float c = foo * float(num);
    // bool isNum = true;
    // vec2 cor = vec2(1.0, 2.0);
    // cor.x = 4.0;
    // vec3 purple = vec3(0.5, 0.5, 1.0);
    // vec3 bar = vec3(cor, 1.0);
    // vec2 a = purple.xy;
    // vec4 b = vec4(1.0, 2.0, 3.0, 4.0);
    // float d = b.w;

    // There are more like mat2, mat3, mat4 for matrices
    // glsl is similar to c language

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.z += sin(modelPosition.x * 20.0) * 0.1;
    modelPosition.z += aRandom * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vRandom = aRandom;
}