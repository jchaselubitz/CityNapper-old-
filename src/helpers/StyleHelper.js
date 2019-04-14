import {StyleSheet} from 'react-native';

const NapColors = {
  primaryBlue: "#5c6174",
  subtleBlue: '#626a7f',
  shadowBlue: '#3f4354',
  actionOrange: '#f58b44',
  actionBlue: '#559ad1', 
  systemBlue: '#4786f6',
  calmBlue: '#818dab', 
  cancelRed: '#c63131',
  pulldownLine: '#c4c8d1'
}

const selectedMapType = "standard"

const styles = StyleSheet.create({
//================ Global =================

//This is the transparent container that CONTAINS the selection card (which is blue or white)
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

destinationTitleText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: NapColors.primaryBlue,
  marginTop: 4,
  marginBottom: 4,
  alignSelf: 'stretch',
},
destinationSubtitleText: {
  fontSize: 14,
  color: NapColors.primaryBlue,
  alignSelf: 'stretch',
},



//================ Map =================


map: {
  zIndex: 0,
  backgroundColor: 'gray',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
},

//================ Create Trip =================

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

// inside tripSelectionContainer
tripSelectionCard: {
  zIndex: 1,
  backgroundColor: NapColors.primaryBlue,
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

savedButtonContainer: {
  flex: 10,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignContent: 'center'
},

savedButton: {
  zIndex: 3,
  marginBottom: 16,
  marginLeft: 16,
  marginRight: 16,
  height: 48,
  padding: 8,
  backgroundColor: NapColors.subtleBlue,
  borderRadius: 8,
  flexDirection:'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  alignSelf: 'stretch',
},
savedButtonText: {
  flex: 9,
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},

//================ View Trip =================

// inside tripSelectionContainer
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

modifySavedIcon: {
  flex: 1,
  flexDirection: "column",
  justifyContent: 'center',
  alignSelf: 'center',
  marginLeft: 16,
  width: 30
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
  backgroundColor: NapColors.primaryBlue,
  borderRadius: 8,
  flexDirection:'column',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'stretch',
  shadowColor: "black",
  shadowRadius: 8,
  shadowOpacity: 0.5,
  shadowOffset: {
    height: 4
  }
},
buttonNapText: {
  fontSize: 24,
  fontWeight: 'bold',
  color: 'white',
},

cancelButton: {
  position: 'absolute',
    top: 24,
    // right: 182,
    left: 16,
  zIndex: 3,
  marginBottom: 0,
  height: 36,
  padding: 6,
  backgroundColor: 'white',
  borderColor: NapColors.cancelRed,
  borderWidth: 0,
  borderRadius: 20,
  flexDirection:'column',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'stretch',
  shadowColor: "darkgrey",
  shadowRadius: 8,
  shadowOpacity: 0.8,
  shadowOffset: {
    height: 4
  }
},

favoriteButton: {
  position: 'absolute',
    top: 24,
    // right: 182,
    left: 60,
  zIndex: 3,
  marginBottom: 0,
  height: 36,
  paddingTop: 7,
  padding: 6,
  backgroundColor: 'white',
  borderColor: NapColors.cancelRed,
  borderWidth: 0,
  borderRadius: 20,
  flexDirection:'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  alignSelf: 'stretch',
  shadowColor: "darkgrey",
  shadowRadius: 8,
  shadowOpacity: 0.8,
  shadowOffset: {
    height: 4
  }
},

//see Global for destinationTitleText

largeToggleContainer: {
  marginTop: 16,
  height: 54,
  backgroundColor: NapColors.subtleBlue,
  borderColor: NapColors.primaryBlue,
  borderWidth: 1,
  borderRadius: 10,
  flexDirection:'column',
  justifyContent: 'center',
  alignSelf: 'stretch',
},


actionToggle: {
  margin: 3,
  height: 48,
  width: '50%',
  backgroundColor: NapColors.actionBlue,
  borderColor: NapColors.actionBlue,
  borderWidth: 0,
  borderRadius: 8,
  flexDirection:'column',
  alignItems: 'center',
  justifyContent: 'center',
 
},

actionToggleText: {
  fontSize: 24,
  color: 'white',
 
},

//================ Search/Save =================

searchButtonText: {
  flex: 9,
  fontSize: 18,
  color: NapColors.primaryBlue,
  alignSelf: 'center'
},

modalHeader: {
  position: 'absolute',
    top: 0,
  backgroundColor: NapColors.primaryBlue,
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
  borderColor: NapColors.primaryBlue,
  backgroundColor: 'white',
  borderWidth: 0,
  borderRadius: 8,
  flexDirection:'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  alignSelf: 'stretch',
  shadowColor: NapColors.shadowBlue,
  shadowRadius: 8,
  shadowOpacity: 0.7,
  shadowOffset: {
    height: 3
  },
  fontSize: 18
},

searchInput: {
  color: "black",
},

pulldownEr: {
  flexDirection: "column",
  backgroundColor: NapColors.primaryBlue,
  height: 20,
  width: 260,
  alignContent: 'center',
  justifyContent: 'center',
  alignSelf: "center",
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  paddingBottom: 5
},

pulldownErLine1: {
  height: 1,
  backgroundColor: NapColors.pulldownLine,
  marginLeft: 20,
  marginRight: 20,
  marginBottom: 2
 
},

pulldownErLine2: {
  height: 1,
  backgroundColor: NapColors.pulldownLine,
  marginLeft: 20,
  marginRight: 20,
  marginTop: 3
},

 //=== Saved/Search - RESULTS LIST ===

 flatList: {
  marginTop: 4,
  marginLeft: 8,
},

listIcon: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 8
},

listDivider: {
    backgroundColor: 'grey',
    marginLeft: 10,
},

//================ Nap =================

// inside tripSelectionContainer

napScreenContainer: {
  opacity: 1,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,

},

napContainer: {
  
  paddingTop: 32,
  paddingBottom: 0,
  position: 'absolute',
    // top: 180,
    left: 0,
    right: 0,
    bottom: 0,
  flex: 5, 
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignContent: 'space-between',
  margin: 0,
  borderRadius: 12,
},

endNapButton: {
  position: 'absolute',
    top: 0,
    left: 24,
    right: 24,
  zIndex: 3,
  marginBottom: 16,
  height: 54,
  padding: 8,
  backgroundColor: NapColors.actionOrange,
  borderColor: 'blue',
  borderWidth: 0,
  borderRadius: 8,
  flexDirection:'column',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'stretch',
  shadowColor: "black",
  shadowRadius: 16,
  shadowOpacity: 0.7,
  shadowOffset: {
    height: 6
  }
},

endNapText: {
  fontSize: 24,
  fontWeight: 'bold',
  color: 'white',
},

//see Global for destinationTitleText
//================ Warning =================

warningScreenContainer: {
  backgroundColor: 'transparent',
  position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  margin: 0,
  padding: 8,
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
},

warningContainer: {
  opacity: 1,
  margin: 16,
  padding: 8,
  alignSelf: 'center',
  // flexDirection: 'column',
  // justifyContent: 'space-between',
  // alignContent: 'space-between',
  // alignItems: 'center',
  borderRadius: 12,
},

warningTitleText: {
  fontSize: 26,
  fontWeight: 'bold',
  color: NapColors.primaryBlue,
  marginBottom: 8,

},
warningText: {
  fontSize: 16,
  color: NapColors.primaryBlue,
  marginBottom: 8
},

warningActionButton: {
  marginTop: 16,
  height: 54,
  backgroundColor: NapColors.systemBlue,
  borderColor: NapColors.actionBlue,
  borderWidth: 0,
  borderRadius: 8,
  flexDirection:'column',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'stretch',
},

warningActionButtonText: {
  fontSize: 24,
  color: 'white',
},

warningActionButtonOutLine: {
  marginTop: 8,
  height: 54,
  backgroundColor: "white",
  borderColor: NapColors.systemBlue,
  borderWidth: 2,
  borderRadius: 8,
  flexDirection:'column',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'stretch',
},

warningActionButtonOutlineText: {
  fontSize: 24,
  color: NapColors.systemBlue,
  alignSelf: 'center',
},


 

})

export default {
  styles,
  NapColors,
  selectedMapType,
}