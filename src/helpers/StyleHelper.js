import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

const styles = StyleSheet.create({
  
  //================SEARCH=================
  map: {
    zIndex: 0,
    backgroundColor: 'gray',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  
  //================SEARCH=================
  buttonFavorite: {
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
  buttonFavoriteText: {
    fontSize: 14,
    color: 'white',
  },
  buttonStartNap: {
    position: 'absolute',
    top: 0,
    right: 16,
    zIndex: 3,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    height: 48,
    padding: 8,
    backgroundColor: '#626a7f',
    borderRadius: 8,
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    shadowColor: "black",
    shadowRadius: 16,
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 6
    }
  },
  buttonNapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  destinationTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5C6174',
    marginBottom: 4,
    alignSelf: 'stretch',
  },
  destinationSubtitleText: {
    fontSize: 14,
    color: '#5C6174',
    alignSelf: 'stretch',
  },

  //================SEARCH=================
  buttonSearch: {
    position: 'absolute',
      top: 0,
      left: 16,
      right: 16,
    zIndex: 3,
    marginBottom: 16,
    height: 48,
    padding: 8,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 8,
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    shadowColor: "black",
    shadowRadius: 16,
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 6
    }
  },
  searchButtonText: {
    fontSize: 14,
    color: '#5C6174',
  },
  modalHeader: {
    position: 'absolute',
      top: 0,
    backgroundColor: '#5C6174',
    width: '100%',
    height: 124,
  },

  searchBar: {
    height: 48,
    padding: 8,
    margin: 16,
    marginTop: 56,
    borderColor: '#5C6174',
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 8,
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: 0.6,
    shadowOffset: {
      height: 6
    },
    
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

  //================CONTAINERS AND SPACERS=================

  tripSelectionContainer: {
    paddingTop: 32,
    paddingBottom: 0,
    position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    flex: 3, 
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    margin: 0,
    borderRadius: 12,
  },

  tripSelectionCard: {
    zIndex: 1,
    backgroundColor: '#5C6174',
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
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  tripDisplayCard: {
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
    alignContent: 'flex-start',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    padding: 16,
    paddingTop: 24,
    paddingBottom: 40,
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  // notchKiller: {
  //   zIndex: 1,
  //   position: 'absolute',
  //     top: 0,
  //   backgroundColor: 'white',
  //   width: '100%',
  //   height: 44,
  //   shadowColor: "darkgrey",
  //   shadowRadius: 8,
  //   shadowOpacity: 0.7,
  //   shadowOffset: {
  //     height: 2
  //   }
  // },
 
})

export default {
  styles
}