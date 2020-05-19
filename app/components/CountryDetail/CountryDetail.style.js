import {StyleSheet} from 'react-native';
import {colors} from 'constants';

const styles = StyleSheet.create({
  card: {
    margin: 8,
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    color: colors.text,
  },
  textBold: {
    fontWeight: 'bold',
  },
});
export default styles;
