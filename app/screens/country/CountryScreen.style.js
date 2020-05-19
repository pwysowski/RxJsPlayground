import {StyleSheet} from 'react-native';
import {colors} from 'constants';
const styles = StyleSheet.create({
  safeArea: {backgroundColor: colors.background, flex: 1},
  inputField: {
    backgroundColor: colors.searchField,
    paddingHorizontal: 8,
    color: colors.text,
  },
});
export default styles;
