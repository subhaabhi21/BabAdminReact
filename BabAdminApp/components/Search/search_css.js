
import {StyleSheet} from 'react-native';
const babBase = '#fff';
export const listStyles = StyleSheet.create({
  catalog: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
    padding:5,
		backgroundColor: babBase
  },
  catalog_details: {
  	flex: 1,
  	flexDirection: 'column',
  	backgroundColor: babBase
  }
});
export const gridStyles= StyleSheet.create({
  catalog: {
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
		backgroundColor: babBase,
    width: 160
  },
  catalog_details: {
  	flex: 1,
  	flexDirection: 'column',
  	backgroundColor: babBase
  }
});
