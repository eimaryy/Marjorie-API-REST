import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  { 
     
    rules: {
      indent: [
        "error",
        2
      ],
      quotes: [
        "error",
        "double"
      ],
      semi: [
        "error",
        "always"
      ]
    } 
  }, 

  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,

];