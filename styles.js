(function() {

// constants

const regular = 'Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'

const constants = {
	// fontSizeBase: `10px`, // fontSize was set on template.html
	fonts: {
		base     : regular,
		regular,
		monospace: '"Source Code Pro Semibold","SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace',
	},
	selectors: {
		all: '*, *:before, *:after',
	},
}


// endregion

// region fonts

function fontFamily({
	family,
	size = 1,
	offsetY = 0.016,
	lineHeight = null,
	lineHeightNormalize = 1 / size,
}) {
	const lineHeightCalc = lineHeightNormalize == null
		? lineHeight
		: (lineHeight || 1) * lineHeightNormalize

	return {
		'.text': {
			'font-family'   : family,
			'font-size'     : `${size * 100}%`,
			'line-height'   : lineHeightCalc, // > 1 ? lineHeightCalc : null,
			'vertical-align': `${-offsetY / size}em`,
		},
		'.font': {
			'font-family': family,
		},
		'&.font': {
			'font-family': family,
			// 'font-size': `${size * 100}%`,
			// 'line-height': lineHeightCalc, // > 1 ? lineHeightCalc : null,
			// 'vertical-align': `${-offsetY}em`,
			// 'margin-top': `${offsetY}em`,
			// 'margin-bottom': `${-offsetY}em`,
		},
	}
}

const arial = fontFamily({
	family: 'Arial',
	size  : 0.948,
})

const tahoma = fontFamily({
	family             : 'Tahoma',
	size               : 0.933,
	lineHeightNormalize: null,
})

const timesNewRoman = fontFamily({
	family : 'Times New Roman',
	size   : 1,
	offsetY: 0,
})

const fonts = {
	fontFamily,
	fonts: {
		arial,
		tahoma,
		timesNewRoman,
		clear: {
			'font-size'             : '100%',
			'font-family'           : constants.fonts.base,
			'color'                 : 'rgba(0, 0, 0, 0)',
			'text-transform'        : 'none',
			'text-rendering'        : 'initial',
			'text-size-adjust'      : 'initial',
			'letter-spacing'        : 'initial',
			'font-weight'           : 'initial',
			'-webkit-box-direction' : 'initial',
			'-webkit-font-smoothing': 'initial',
		}
	}
}

// endregion

// region templates

const fontInherit = {
	'font-style'             : 'inherit',
	'font-variant-ligatures' : 'inherit',
	'font-variant-caps'      : 'inherit',
	'font-variant-numeric'   : 'inherit',
	'font-variant-east-asian': 'inherit',
	'font-weight'            : 'inherit',
	'font-stretch'           : 'inherit',
	'font-size'              : '100%',
	'line-height'            : 'inherit',
	'font-family'            : 'inherit',
}

const buttonAsDiv = {
	'align-items'     : 'normal',
	'background-color': 'transparent',
	'background-image': 'none',
	'box-sizing'      : 'inherit',
	color             : 'inherit',
	cursor            : 'auto',
	display           : 'inline-block',
	'vertical-align'  : `middle`,

	...fontInherit,

	'letter-spacing'        : 'inherit',
	margin                  : '0',
	padding                 : '0',
	'text-align'            : 'start',
	'text-indent'           : '0',
	'text-rendering'        : 'inherit',
	'text-shadow'           : 'inherit',
	'text-transform'        : 'inherit',
	'-webkit-appearance'    : 'inherit',
	'-webkit-font-smoothing': 'inherit',
	'-webkit-writing-mode'  : 'inherit',
	'word-spacing'          : '0',

	// Firefox
	'border-style'           : `solid`,
  	'border-color'           : `black`,
  	'border-width'           : `0`,
	'-moz-appearance'        : 'inherit',
	'-moz-osx-font-smoothing': 'inherit',
	'-moz-user-select'       : 'inherit',
	'overflow-clip-box'      : 'inherit',
	'padding-block-end'      : '0',
	'padding-block-start'    : '0',
	'padding-inline-end'     : '0',
	'padding-inline-start'   : '0',
	'white-space'            : 'normal',
	'&::-moz-focus-inner'    : {
		border : '0',
		padding: '0',
	},

	// IE
	overflow: 'visible',
	zoom    : 'inherit',

	// Additional
	outline: 'none',
}

const textboxAsDiv = {
	'background-color': 'transparent',
	'background-image': 'none',
	'border-style'    : `solid`,
  	'border-color'    : `black`,
  	'border-width'    : `0`,
	'box-sizing'      : 'inherit',
	display           : 'inline-block',
	color             : 'inherit',
	'vertical-align'  : `middle`,

	...fontInherit,
	'font-family':	null,

	margin              : '0',
	padding             : '0',
	'-webkit-appearance': 'none',
}

const anchorColor = ({
	all,
	base,
	link,
	visited,
	hover,
	active,
}) => {
	const result = {}
	if (all || base) {
		result.color = all || base
	}
	if (all || link) {
		result['&:link'] = {
			color: all || link,
		}
	}
	if (all || visited) {
		result['&:visited'] = {
			color: all || visited,
		}
	}
	if (all || hover) {
		result['&:hover'] = {
			color: all || hover,
		}
	}
	if (all || active) {
		result['&:active'] = {
			color: all || active,
		}
	}
	return result
}

const anchorAsDiv = {
	...anchorColor({
		all: 'inherit',
	}),
	'text-decoration': 'inherit',
}

const bordersInnerShadow = ({
	color,
	width,
} = {}) => color && width && {
	'box-shadow': `inset 0px 0px 0px ${width} ${color}`,
}

function noWrap({
	maxLines = 1,
	lineHeightEm = void 0,
	ellipsis = true,
} = {}) {
	const result = {}

	if (ellipsis) {
		result.overflow = 'hidden'
		result['text-overflow'] = 'ellipsis'
	}

	if (maxLines === 1) {
		Object.assign(result, {
			'white-space': 'nowrap',
			'line-height': lineHeightEm && `${lineHeightEm}em`,
		})
	} else if (maxLines > 1) {
		Object.assign(result, {
			display             : '-webkit-box',
			'-webkit-box-orient': 'vertical',
			'-webkit-line-clamp': `${maxLines}`,
			'line-height'       : lineHeightEm && `${lineHeightEm}em`,
			'max-height'        : `${maxLines * lineHeightEm}em`,
		})
	}

	return result
}

function transition(
	durationSec,
	includes = [
		'opacity',
		'background-color',
		'color',
		'border-color',
		'box-shadow',
		'fill',
		'fill-opacity',
		'flood-color',
		'flood-opacity',
		'lighting-color',
		'outline-color',
		'stop-color',
		'stop-opacity',
		'stroke-opacity',
		'text-decoration-color',
		'text-shadow',
	],
	excludes = [],
) {
	return {
		transition: includes.map(o => `${o} ${durationSec}s`)
			.concat(excludes.map(o => `${o} 0`))
			.join(', '),
	}
}

const noSelect = {
	'user-select'        : 'none',
	'-moz-user-select'   : 'none',
	'-webkit-user-select': 'none',
	'-ms-user-select'    : 'none',
}

const noDrag = {
	'user-drag'        : 'none',
	'-webkit-user-drag': 'none',
}

const templates = {
	buttonAsDiv,
	textboxAsDiv,
	anchorAsDiv,
	anchorColor,
	noWrap,
	bordersInnerShadow,
	transition,
	noSelect,
	noDrag,
	...fonts,
}

// endregion

// region reset

const buttonsReset = {
	[[
		'[type=\'button\']',
		'[type=\'submit\']',
		'[type=\'reset\']',
		'[type=\'color\']',
		'button',
	].join(',\n\t')]: [
		buttonAsDiv,
	],
	'[type=\'file\']::-webkit-file-upload-button': [
		{
			...buttonAsDiv,
			'&::-moz-focus-inner': null,
		},
	],
}

const textboxReset = {
	[[
		'textarea',
		'[type=\'text\']',
		'[type=\'email\']',
		'[type=\'password\']',
		'select',
	].join(',\n\t')]: [
		textboxAsDiv,
	],
}

const tagsResetGlobal = {
	'body, html': {
		'-webkit-overflow-scrolling': `touch`,
		'-webkit-text-size-adjust'  : `none`,
		position                    : `fixed`,
		left                        : `0`,
		right                       : `0`,
		top                         : `0`,
		bottom                      : `0`,
		'overscroll-behavior'       : `none`,
		overflow                    : `hidden`,
		background                  : `transparent`,
	},
	body: {
		'font-family': constants.fonts.regular,
	},
	td: {
		'vertical-align': 'middle',
		'padding-left'  : '0',
		'padding-right' : '0',
		'padding-top'   : '0',
		'padding-bottom': '0',
	},
	th: {
		'text-align': 'left',
	},
	ul: {
		margin: 'initial',
	},
	button: {
		position   : 'relative',
		'font-size': 'inherit',
	},
	[constants.selectors.all]: {
		'background-repeat'  : 'no-repeat',
		'background-position': 'center',
		'background-size'    : 'contain',
		'mask-repeat'        : 'no-repeat',
		'mask-position'      : 'center',
		'mask-size'          : 'contain',
		'box-sizing'         : 'border-box',
		'vertical-align'     : `middle`,
	},
}

const tagsResetApp = {
	'*:focus': {
		outline: 'none',
	},

	a: {
		...templates.anchorAsDiv,
		...templates.noSelect,
		...templates.noDrag,
	},

	button: {
		'white-space': 'nowrap',
	},

	[[
		'radio',
		'checkbox',
	]
		.map(o => `[type='${o}']`)
		.join(', ')]: {
		...templates.inputHidden,
	},

	td: {
		padding: '0',
	},

	table: {
		'border-spacing': '0',
	},

	main: {
		// font rendering
		// 'text-shadow'   : `1px 1px 1px rgba(0,0,0,0.004)`,
		'text-rendering'        : 'optimizeSpeed',
		'-webkit-font-smoothing': 'none',
		'user-select'           : 'none',
	},
}


// endregion

// region button

const button = (function() {
	const background = ({color}) => ({
		'background-color': color,
	})

	const border = ({
		color = 'transparent',
		width = '1.5px',
	}) => ({
		...templates.bordersInnerShadow({
			color,
			width,
		}),
	})

	const text = ({color}) => ({
		...color && templates.anchorColor({
			all: color,
		}),
		'& > icon-mask': {
			'background-color': color,
		},
	})

	const base = ({
		noWrap = true,
		colorBackground = 'white',
		colorBorder = 'transparent',
		borderWidth = '1.5px',
		hover = {
			opacity        : 0.75,
			invert         : '15%',
			colorBackground: void 0,
			colorBorder    : void 0,
			borderWidth    : void 0,
		},
		disabled = {
			opacity        : 0.5,
			invert         : '5%',
			colorBackground: void 0,
			colorBorder    : void 0,
			borderWidth    : void 0,
		},
		active = {
			opacity        : 0.5,
			invert         : '20%',
			colorBackground: void 0,
			colorBorder    : void 0,
			borderWidth    : void 0,
		},
		checked = {
			opacity        : 0.80,
			invert         : '10%',
			colorBackground: void 0,
			colorBorder    : void 0,
			borderWidth    : void 0,
		},
		withText = false,
	} = {}) => [
		// templates.anchorAsDiv,
		// templates.buttonAsDiv,
		{
			...templates.contentCenter,
			...(noWrap && templates.noWrap()),
			display: withText ? 'inline-block' : 'inline-flex',
			width  : 'auto',

			// 'text-transform': `uppercase`,
			// 'font-weight'   : `bold`,

			...background({color: colorBackground}),
			...border({
				color: colorBorder,
				width: borderWidth,
			}),

			'&:disabled': {
				...background({color: disabled.colorBackground}),
				...(disabled.colorBorder || disabled.borderWidth) && border({
					color: disabled.colorBorder || colorBorder,
					width: disabled.borderWidth || borderWidth,
				}),
				opacity         : disabled.opacity,
				filter          : disabled.invert && `invert(${disabled.invert})`,
				'pointer-events': 'none',
			},
			'&:hover': {
				...background({color: hover.colorBackground}),
				...(hover.colorBorder || hover.borderWidth) && border({
					color: hover.colorBorder || colorBorder,
					width: hover.borderWidth || borderWidth,
				}),
				opacity: hover.opacity,
				filter : hover.invert && `invert(${hover.invert})`,
			},
			'&:active': {
				...background({color: active.colorBackground}),
				...(active.colorBorder || active.borderWidth) && border({
					color: active.colorBorder || colorBorder,
					width: active.borderWidth || borderWidth,
				}),
				opacity: active.opacity,
				filter : active.invert && `invert(${active.invert})`,
			},
			':checked ~ &': {
				...background({color: checked.colorBackground}),
				...(checked.colorBorder || checked.borderWidth) && border({
					color: checked.colorBorder || colorBorder,
					width: checked.borderWidth || borderWidth,
				}),
				opacity: checked.opacity,
				filter : checked.invert && `invert(${checked.invert})`,
			},

			'user-select': 'none',
			cursor       : 'pointer',

			'&, &:before, &:after': {
				// ...templates.transition(0.5),
			},

			'& > *': {
				'pointer-events': 'none',
			},

			'align-items'    : `center`,
			'justify-content': `center`,
		},
		!withText && {
			'& > .icon-inline': {
				'margin-top': `0`,
			},
		},
	]

	const withText = ({
		noWrap = true,
		colorBackground = 'white',
		colorText = '#000',
		colorBorder = 'transparent',
		borderWidth = '1.5px',
		hover = {
			opacity        : 0.75,
			invert         : '15%',
			colorText      : void 0,
			colorBackground: void 0,
			colorBorder    : void 0,
			borderWidth    : void 0,
		},
		disabled = {
			opacity        : 0.5,
			invert         : '5%',
			colorText      : void 0,
			colorBackground: void 0,
			colorBorder    : void 0,
			borderWidth    : void 0,
		},
		active = {
			opacity        : 0.5,
			invert         : '20%',
			colorText      : void 0,
			colorBackground: void 0,
			colorBorder    : void 0,
			borderWidth    : void 0,
		},
	} = {}) => [
		base({
			noWrap,
			colorBackground,
			colorBorder,
			borderWidth,
			hover,
			disabled,
			active,
			withText: true,
		}),
		{
			...text({color: colorText}),
		},
		{
			'padding-left' : '0.3em',
			'padding-right': '0.3em',

			'&:disabled': {
				...text({color: disabled.colorText}),
			},
			'&:hover': {
				...text({color: hover.colorText}),
			},
			'&:active': {
				...text({color: active.colorText}),
			},
		},
	]
	
	return {
		base,
		withText,
		background,
		border,
	}
})()

// endregion

// helpers

const visibility = {
	'.hidden': {
		visibility: 'hidden',
	},
	'.collapsed': {
		display: 'none',
	},
	'.no-ghost-childs > *': {
		'pointer-events': 'auto',
		'user-select'   : 'auto',
	},
	'.ghost': {
		'pointer-events': 'none',
		'user-select'   : 'none',
	},
	'.no-ghost': {
		'pointer-events': 'auto',
		'user-select'   : 'auto',
	},
}


const helpers = {
	'.fill': {
		...templates.fill,
	},
	'.no-drag': {
		...templates.noDrag,
	},
	'.no-select': {
		...templates.noSelect,
	},
	'.no-wrap': {
		...templates.noWrap(),
		'&-2': {
			...templates.noWrap({maxLines: 2}),
		},
		'&-3': {
			...templates.noWrap({maxLines: 3}),
		},
	},
	...visibility,
}

// endregion

// region scrollbar

function scrollbars({
	width = '0.5em',
	padding = '0.5em',
	minWidth = '2px',
	backgroundColor = 'transparent',
	thumbColor = 'rgba(255, 255, 255, .2)',
} = {}) {
	return {
		'&::-webkit-scrollbar': {
			'-webkit-appearance': 'none',
			width               : `calc(${width} + ${padding} * 2)`,
			height              : `calc(${width} + ${padding} * 2)`,
			'min-width'         : `calc(${minWidth} + ${padding} * 2)`,
			'min-height'        : `calc(${minWidth} + ${padding} * 2)`,
		},
		'&::-webkit-scrollbar:vertical': {

		},
		'&::-webkit-scrollbar:horizontal': {

		},
		'&::-webkit-scrollbar-thumb': {
			'border-radius'   : `calc(${width} + ${padding} * 2)`,
			'background-color': thumbColor,
			'border-color'    : 'transparent',
			'border-style'    : 'solid',
			'border-width'    : `${padding}`,
			'background-clip' : 'padding-box',
		},
		'&::-webkit-scrollbar-track': {
			'background-color': backgroundColor,
			margin            : `calc(0 - ${padding})`,
		},
		'&::-webkit-scrollbar-corner': {
			display   : 'none',
			background: 'transparent',
		},
	}
}

const scrollbar = {
	'.scrollbar': {
		...scrollbars(),
	},
}

// endregion

// region icon

const icon = {
	'.icon': {
		position: 'absolute',
		top     : '0',
		left    : '0',
		right   : '0',
		bottom  : '0',
		margin  : 'auto',
	},
	'.icon-block': {
		display: 'block',
		width  : '1em',
		height : '1em',
	},
	'.icon-inline': {
		display: 'inline-block',
		width  : '1em',
		height : '1em',

		'vertical-align': 'middle',
		'margin-top'    : '-0.223em',
		'white-space'   : 'nowrap',

		...templates.fonts.clear,

		'font-size': '100% !important',
	},
	'.icon-mask': {
		'-webkit-mask-position'  : `center center`,
		'-webkit-mask-position-x': `center`,
		'-webkit-mask-position-y': `center`,
		'mask-position'          : `center center`,
		'-webkit-mask-size'      : `contain`,
		'mask-size'              : `contain`,
		'-webkit-mask-repeat'    : `no-repeat`,
		'mask-repeat'            : `no-repeat`,
	},
}

// endregion

return [
  // buttonsReset,
  // textboxReset,
  // tagsResetGlobal,
  // tagsResetApp,
  helpers,
  // icon,
  // scrollbar,
  // {
	// '.button': button.base(),
	// '.button-text': button.withText(),	
  // },
  // {
    // '.no-select': [
		// noSelect,
	// ],
    // '.no-drag': [
		// noDrag,
	// ],
  // }
]

})()