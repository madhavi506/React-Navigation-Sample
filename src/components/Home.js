import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, Image, Dimensions, Text, FlatList, ImageBackground, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Heart from 'react-native-vector-icons/AntDesign';
import Dots from 'react-native-vector-icons/Entypo';
import Grid from 'react-native-vector-icons/MaterialCommunityIcons';
import Contact from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();
Heart.loadFont();
Dots.loadFont();
Grid.loadFont();
Contact.loadFont();

export default class Home extends Component{
  constructor(props) {
    super(props)
    this.state = {
      postsList: [],
      profile: {},
      articlePageDetails: {},
      loading: true,
      page: 1,
      perPage: 10,
      onEndLoading: false
    }
  }

  componentDidMount() {
    fetch('https://tempapi.proj.me/api/liT4msOs6', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((json) => {
      this.setState({ 
        postsList: json[0].posts, 
        profile: json[0].profile, 
        loading: false 
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  renderListItem=({item})=>{
    return(
      <View style={styles.postView}>
        <View style={styles.postDetailsView}>
          <View style={{ flex: 2, flexDirection: 'row', margin: 5, alignItems: 'center', justifyContent: 'flex-start' }}>
            <Icon name="user-circle" size={30} color="#900" />
            <View style={{ margin: 5 }}><Text>{item.name}</Text><Text style={{ color: 'red', paddingTop: 5 }}>{item.username}</Text></View>
          </View>
          <View style={{ flex: 1, margin: 10 }}>
            <Text style={{ textAlign: 'center', paddingBottom: 5 }}>{item.post_time.split(" ")[0]}</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Heart name="hearto" size={20} color="red" />
              <Text> {item.likes}    </Text>
              <Icon name="comment-o" size={20} color="#000" />
              <Text> {item.comments} </Text></View>
          </View>
        </View>
        <Image source={{ uri: item.url }} style={styles.postImageStyles} />
        <Text maxFontSizeMultiplier={1.7} style={styles.titleStyles}>{item.post_text}</Text>
      </View>
		)
  }

  renderListEmptyView = () => {
    return (
      <View style={styles.listEmptyView}>
        <EmptyTrackingTypeIcon width={110} height={100}/>
        <Text maxFontSizeMultiplier={1.7} style={styles.emptyListTextStyle}>No Items</Text>
      </View>
    )
  }

  render(){
    const{profile, postsList, loading}=this.state;
    return(
      <ScrollView style={styles.sectionContainer}>
        <View>
          <ImageBackground
            source={{ uri: profile.background }}
            resizeMode={"contain"}
            style={styles.imageView}
          >
            <View style={{ flex: 1, justifyContent: 'space-between'}}>
              <View style={{ flex: 5, flexDirection: 'row', margin: 10 }}>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                    <Icon name="bars" size={20} color="#000" style={{ paddingRight: 5 }}/>
                  </TouchableOpacity>
                  <Text style={{ textAlign: 'center' }}> Profile </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Icon name="search" size={20} color="#000" />
                  <Dots name="dots-three-vertical" size={20} color="#000" />
                </View>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', margin: 10 }}>
                <View style={{ width: 100, backgroundColor: '#ddd', borderRadius: 50, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Edit Profile</Text>
                  </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.headerIconsView}>
          <Icon name="user-circle" size={90} color="#000" />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', marginVertical: 15 }}>
          <View style={{ flex: 1 }}>
          </View>
          <View style={styles.postFollowing}>
            <Text>{profile.post}</Text>
            <Text>Posts</Text>
          </View>
          <View style={styles.postFollowing}>
            <Text>{profile.followers}</Text>
            <Text>Followers</Text>
          </View>
          <View style={styles.postFollowing}>
            <Text>{profile.following}</Text>
            <Text>Following</Text>
          </View>
        </View>
        <View style={{ Height: Dimensions.get('window').height/3, flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderBottomWidth: 1, padding: 10, borderColor: '#ddd' }}>
          <Grid name="grid" size={30} color="#000" />
          <Contact name="perm-contact-cal" size={30} color="#000" />
          <Grid name="video-outline" size={30} color="#000" />
        </View>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(item, index) => index.toString()}
          data={postsList}
          renderItem={this.renderListItem}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={!loading && this.renderListEmptyView}
        />
      </ScrollView>
    )
  }
}
 
 const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1
  },
  postImageStyles: {
    height: 187,
    width: Dimensions.get('window').width-30,
  },
  postView: {
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  titleStyles: {
    textAlign: 'left',
    lineHeight: 18,
    letterSpacing: 0.6,
    marginVertical: 10
  },
  imageView: {
    height: 200,
    position: 'relative'
  },
  headerIconsView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 135,
    height: 110,
    width: 110,
    overflow: "hidden",
    zIndex: 999,
    padding: 10,
    flexDirection: 'row'
  },
  postDetailsView: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  postFollowing: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  }
 });
 
 