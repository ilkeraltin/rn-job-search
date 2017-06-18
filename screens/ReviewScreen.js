import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    headerRight: 
        <Button  
            title="Settings" 
            onPress={() => { navigation.navigate('settings') }}
            backgroundColor="rgba(0,0,0,0)"
            color="rgba(0,122,255,1)"
        />,
    style: {
        marginTop: Platform.OS === 'android' ? 24 : 0
    },
    tabBarIcon: ({ tintColor }) => {
                return <Icon name="favorite" size={30} color={tintColor} />;
    }
  })

renderLikedJobs() {
    return this.props.likedJobs.map(job => {
    
    const  {
        company, formattedRelativeTime, jobkey,
        url, longitude, latitude, jobtitle
    } = job;
    const initialRegion = {
        longitude: longitude,
        latitude: latitude,
        longitudeDelta: 0.045,
        latitudeDelta: 0.02
    }
    
        return(
            <Card title={jobtitle} key={jobkey}>
                <View style={{ height: 200 }}>
                    <MapView 
                        style={{ flex: 1 }}
                        cacheEnabled={Platform.OS === 'android'}
                        initialRegion={initialRegion}
                        scrollEnabled={false}
                    />

                    <View style={styles.detailWrapper}>
                        <Text style={styles.italics}>{company}</Text>
                        <Text style={styles.italics}>{formattedRelativeTime}</Text>
                    </View>
                    <Button
                        title="Apply Now!"
                        backgroundColor="#03A9F4"
                        onPress={() => Linking.openURL(url)}
                    />
                </View>
            </Card>
        );
    });
}

render(){
    return (
        <ScrollView>
            {this.renderLikedJobs()}
        </ScrollView>
    );
}
}

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
        justifyContent: 'space-around'
    },
    italics: {
        fontStyle: 'italic'
    }
}

function mapStateToProps(state) {
    return { likedJobs: state.likedJobs }
}

export default connect(mapStateToProps)(ReviewScreen);