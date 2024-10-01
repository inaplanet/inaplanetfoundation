import shaderFragment from '../../shaders/glows/fragment.glsl'
import shaderVertex from '../../shaders/glows/vertex.glsl'

const GlowPass = {
    uniforms:
    {
        tDiffuse: { type: 't', value: null },
        uPosition: { type: 'v2', value: null },
        uRadius: { type: 'f', value: null },
        uColor: { type: 'v3', value: null },
        uAlpha: { type: 'f', value: null }
    },
    vertexShader: shaderVertex,
    fragmentShader: shaderFragment
}

export default GlowPass;