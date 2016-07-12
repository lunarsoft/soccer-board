import * as colors from 'material-ui/styles/colors';
import * as colorManipulator from 'material-ui/utils/colorManipulator';
import * as spacing from 'material-ui/styles/spacing';

const spacing2 = _interopRequireDefault(spacing);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */

export default {
  spacing: spacing2.default,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: colors.green500,
    primary2Color: colors.green700,
    primary3Color: colors.grey400,
    accent1Color: colors.pinkA200,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    disabledColor: (0, colorManipulator.fade)(colors.darkBlack, 0.3),
    pickerHeaderColor: colors.green500,
    clockCircleColor: (0, colorManipulator.fade)(colors.darkBlack, 0.07),
    shadowColor: colors.fullBlack
  }
};
