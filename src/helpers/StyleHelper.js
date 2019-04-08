import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

const styles = StyleSheet.create({
  buttonSearch: {
    position: 'absolute',
      top: 0,
      left: 16,
      right: 16,
    zIndex: 3,
    marginBottom: 16,
    height: 48,

    padding: 8,
    borderColor: '#5C6174',
    backgroundColor: 'white',
    borderWidth: 3,
    borderRadius: 8,
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    shadowColor: "darkgrey",
    shadowRadius: 16,
    shadowOpacity: 0.9,
    shadowOffset: {
      height: 6
    }
  },
  buttonSecondary: {
    // position: 'relative',
    // bottom: 0,
    // left: 16,
    // right: 16,
    zIndex: 3,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    height: 40,
    padding: 8,
    backgroundColor: '#626a7f',
    borderRadius: 8,
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  searchButtonText: {
    fontSize: 16,
    color: '#5C6174',
  },
  buttonText: {
    fontSize: 16,
    color: '#fcf6ec',
  },
  map: {
    zIndex: 0,
    backgroundColor: 'gray',
    position: 'absolute',
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
  separator: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tripSelectionContainer: {
    paddingTop: 32,
    position: 'absolute',
      left: 0,
      right: 0,
      bottom: 16,
    flex: 3, 

    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    margin: 16,
    borderRadius: 12,
    shadowColor: "darkgrey",
    shadowRadius: 16,
    shadowOpacity: 0.7
  },
  tripSelectionCard: {
    zIndex: 1,
    backgroundColor: 'white',
    shadowColor: "darkgrey",
    shadowRadius: 16,
    shadowOpacity: 0.9,
    position: 'relative',
      left: 0,
      right: 0,
      bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    paddingTop: 32,
    paddingBottom: 8,
    borderRadius: 12,
    
  }
})

export default {
  styles
}