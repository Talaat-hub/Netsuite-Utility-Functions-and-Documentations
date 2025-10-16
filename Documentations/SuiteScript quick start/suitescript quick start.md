# Readying up SuiteScript Snippets on VS Code

It is pretty simple and makes your start with a netsuite suitescript project more reliable and faster, You don't have to think of updating the version of the suitescript 2.x for example and you write it as 2.1 at once in a snippet that you will use from now on, preventing you from falling into unnecessary errors because you "forgot🤡" adjusting the built in suitescript snippet.

# How to make your own snippet ?

1 - Open command palette and type `(CTRL + Shift + P)` for windows, `(CMD + Shift + P)`.

2 - Select `snippets: Configure User Snippets` then `New Global Snippet File`.

3 - Type the Name of the Snippet, in our example we will try making our own custom UserEvent Script, so lets make it `ss_clientscript`.

4 - You will see a file with the name you entered with some instructions.

5 - Now that we reached this point, let's break it up:

```

{
	// Place your global snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and 
	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope 
	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is 
	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are: 
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. 
	// Placeholders with the same ids are connected.
	// Example:
	// "Print to console": {
	// 	"scope": "javascript,typescript",
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }
}

```

- `"Print to console"` : The object name, let's replace the written with `NetSuite User Event Script 2.1`

- `"scope"` : A list of language names to which this snippet applies, e.g. 'typescript,javascript', in our case, we use javascript, so we will type it like `"scope": "javascript"`

- `"prefix"` : The prefix to use when selecting the snippet, like when you type `userevent` in VS Code and it shows you the default userevent script snippet, we type our own prefix here, let use make it `"prefix": "ss_userevent"`

- `"body"` : The snippet content. Use $1, ${1:defaultText} to define cursor positions (i.e. The space where you will write your code inside the snippet), use $0 for the final cursor position (Nothing will be written after).

In our case we use userevent and we want to refine the default ones, I will show you mine:

```

"body": [
		"/**",
		" * @NApiVersion 2.1",
		" * @NScriptType UserEventScript",
		" */",
		"define(['N/log'], function(log) {",
		"",
		"    const beforeLoad = (context) => {",
		"        try {",
		"            $1",
		"        } catch (errbeforeLoad) {",
		"            log.debug('errbeforeLoad', errbeforeLoad);",
		"        }",
		"    };",
		"",
		"    const afterSubmit = (context) => {",
		"        try {",
		"            $2",
		"        } catch (errafterSubmit) {",
		"            log.debug('errafterSubmit', errafterSubmit);",
		"        }",
		"    };",
		"",
		"    const beforeSubmit = (context) => {",
		"        try {",
		"            $3",
		"        } catch (errbeforeSubmit) {",
		"            log.debug('errbeforeSubmit', errbeforeSubmit);",
		"        }",
		"    };",
		"",
		"    return {",
		"        beforeLoad: beforeLoad,",
		"        afterSubmit: afterSubmit,",
		"        beforeSubmit: beforeSubmit",
		"    }",
		"});",
		"$0"
	  ]


```

- Description: Well ... nothing to mention here, just description, I would write `"Creates a boilerplate for a NetSuite 2.1 User Event Script."`.

- Full snippet:

```

{
	"NetSuite User Event Script 2.1": {
	  "scope": "javascript",
	  "prefix": "ss_userevent",
	  "body": [
		"/**",
		" * @NApiVersion 2.1",
		" * @NScriptType UserEventScript",
		" */",
		"define(['N/log'], function(log) {",
		"",
		"    const beforeLoad = (context) => {",
		"        try {",
		"            $1",
		"        } catch (errbeforeLoad) {",
		"            log.debug('errbeforeLoad', errbeforeLoad);",
		"        }",
		"    };",
		"",
		"    const afterSubmit = (context) => {",
		"        try {",
		"            $2",
		"        } catch (errafterSubmit) {",
		"            log.debug('errafterSubmit', errafterSubmit);",
		"        }",
		"    };",
		"",
		"    const beforeSubmit = (context) => {",
		"        try {",
		"            $3",
		"        } catch (errbeforeSubmit) {",
		"            log.debug('errbeforeSubmit', errbeforeSubmit);",
		"        }",
		"    };",
		"",
		"    return {",
		"        beforeLoad: beforeLoad,",
		"        afterSubmit: afterSubmit,",
		"        beforeSubmit: beforeSubmit",
		"    }",
		"});",
		"$0"
	  ],
	  "description": "Creates a boilerplate for a NetSuite 2.1 User Event Script."
	}
  }

```

## Authors

[Mahmoud Talaat](https://www.linkedin.com/in/mahmoudtalaat21/) – NetSuite Developer

Feel free to connect or contribute!

Let me know if you have special focus (e.g., SuiteQL, OAuth, or CSV imports) and I’ll tailor it even more!