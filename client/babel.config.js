module.exports = {  
    ignore: [
        /node_modules/,
    ],
    presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-modules-commonjs',
        '@babel/transform-object-rest-spread',
        '@babel/transform-arrow-functions',
        '@babel/plugin-transform-async-to-generator',
        '@babel/proposal-class-properties',
    ],
};