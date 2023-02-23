const HIGH_SCHOOL_KEYBOARD_LAYER = {
	"high-school-layer": {
	  styles: "",
	  rows: [
		[
		  { latex: "a" },
		  { latex: "x" },
		  { class: "separator w5" },
		//   { label: "7", key: "7" },
		  // Will display the label using the system font. To display 
		  // with the TeX font, use:
		  { class: "tex", label: "7", key: "7" },
		  // or 
		  // { latex: "7"},
		  { label: "8", key: "8" },
		  { label: "9", key: "9" },
		  { latex: "\\div" },
		  { class: "separator w5" },
		  {
			class: "tex small",
			label: "<span><i>x</i>&thinsp;²</span>",
			insert: "$$#@^{2}$$"
		  },
		  {
			class: "tex small",
			label: "<span><i>x</i><sup>&thinsp;<i>n</i></sup></span>",
			insert: "$$#@^{}$$"
		  },
		  {
			class: "small",
			latex: "\\sqrt{#0}",
			insert: "$$\\sqrt{#0}$$",
		  }
		],
		[
		  { class: "tex", latex: "b" },
		  { class: "tex", latex: "y" },
		  { class: "separator w5" },
		  { label: "4", latex:"4" },
		  { label: "5", key: "5" },
		  { label: "6", key: "6" },
		  { latex: "\\times" },
		  { class: "separator w5" },
		  { class: "small", latex: "\\frac{#0}{#0}" },
		  { class: "separator" },
		  { class: "separator" }
		],
		[
		  { class: "tex", label: "<i>c</i>" },
		  { class: "tex", label: "<i>z</i>" },
		  { class: "separator w5" },
		  { label: "1", key: "1" },
		  { label: "2", key: "2" },
		  { label: "3", key: "3" },
		  { latex: "-" },
		  { class: "separator w5" },
		  { class: "separator" },
		  { class: "separator" },
		  { class: "separator" }
		],
		[
		  { latex: "(" },
		  { latex: ")" },

		  { class: "separator w5" },
		  { label: "0", key: "0" },
		  { latex: "." },
		  { latex: "\\pi" },
		  { latex: "+" },
		  { class: "separator w5" },
		  {
			class: "action",
			label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
			command: ["performWithFeedback", "moveToPreviousChar"]
		  },
		  {
			class: "action",
			label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
			command: ["performWithFeedback", "moveToNextChar"]
		  },
		  {
			class: "action font-glyph bottom right",
			label: "&#x232b;",
			command: ["performWithFeedback", "deleteBackward"]
		  }
		]
	  ]
	}
  };

  const HIGH_SCHOOL_KEYBOARD = {
	"high-school-keyboard": {
	  "label": "High School", // Label displayed in the Virtual Keyboard Switcher
	  "tooltip": "High School Level", // Tooltip when hovering over the label
	  "layer": "high-school-layer"
	}
  };