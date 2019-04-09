import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

const styles = StyleSheet.create({
  
  //================ MAP =================
  map: {
    zIndex: 0,
    backgroundColor: 'gray',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  
  //================ BUTTONS =================
  buttonContainer: {
    flex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center'
  },

  buttonFavorite: {
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
  },
  buttonFavoriteText: {
    flex: 9,
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  buttonStartNap: {
    position: 'absolute',
    top: 0,
    right: 16,
    zIndex: 3,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    height: 60,
    padding: 16,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  cancelNapButton: {
    position: 'absolute',
      right: 180,
    zIndex: 3,
    marginTop: 16,
    marginBottom: 16,
    height: 40,
    padding: 8,
    backgroundColor: 'white',
    borderColor: '#626a7f',
    borderWidth: 0,
    borderRadius: 8,
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: "black",
    shadowRadius: 16,
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 6
    }
  },

  cancelNapText: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#626a7f',
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

  //================ SEARCH =================

  searchButtonContainer: {
    flex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center'
  },

  buttonSearch: {
    position: 'absolute',
      top: 0,
      left: 24,
      right: 24,
    zIndex: 3,
    marginBottom: 16,
    height: 54,
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
    flex: 9,
    fontSize: 18,
    color: '#5C6174',
    alignSelf: 'center'
  },

  modalHeader: {
    position: 'absolute',
      top: 0,
    backgroundColor: '#5C6174',
    width: '100%',
    height: 124,
    alignSelf: 'stretch',
  },

  searchBar: {
    height: 56,
    paddingLeft: 16,
    padding: 8,
    margin: 16,
    marginTop: 48,
    borderColor: '#5C6174',
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 8,
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    shadowColor: "black",
    shadowRadius: 6,
    shadowOpacity: 0.6,
    shadowOffset: {
      height: 1
    },
    fontSize: 18
  },

  searchInput: {
    color: "black",
  },

  //================ RESULTS LIST =================

  flatList: {
    marginTop: 4
  },

  listIcon: {
      flex: 1,
      flexDirection: "column",
      justifyContent: 'center',
      alignSelf: 'center',
  },

  listDivider: {
      backgroundColor: 'grey',
      marginLeft: 10,
  },


  // separator: {
  //   borderBottomColor: '#bbb',
  //   borderBottomWidth: StyleSheet.hairlineWidth,
  // },

  //================CONTAINERS AND SPACERS=================

  //This is the transparent container that CONTAINS the selection card (which is blue)
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
    paddingTop: 48,
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
    marginTop: 16,
    padding: 16,
    paddingTop: 24,
    paddingBottom: 40,
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
 
})

export default {
  styles
}