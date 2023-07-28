export default {
	input: 'src/frontin.js',
	output: [
    {
		  file: "dist/frontin.cjs.js",
		  format: 'cjs',
	  },
    {
      file: "dist/frontin.esm.js",
      format: 'es' ,
    }
  ]
};