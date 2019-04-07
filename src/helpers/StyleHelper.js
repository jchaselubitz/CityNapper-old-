import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

const styles = StyleSheet.create({
  buttonPrimary: {
    marginBottom: 10,
    padding: 10,
    width: 260,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#626a7f',
    width: '80%',
    borderRadius: 4
  },
  buttonSecondary: {
    marginBottom: 10,
    padding: 10,
    width: 260,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#626a7f',
    width: '80%',
    fontSize: 18,
    borderRadius: 4
  },
  buttonText: {
    fontSize: 18,
    color: '#fcf6ec',
  },
  map: {
    flex: 1,
    backgroundColor: 'gray',
    flexDirection: 'column',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  flatList: {
    flex: 6
  },
  searchInput: {
    color: "black"
  },
  tripSelectionContainer: {
    flex: 3, 
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10

  }
})

export default {
  styles
}