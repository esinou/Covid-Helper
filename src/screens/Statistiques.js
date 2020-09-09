import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../const/Colors';
import { AdMobBanner } from 'expo-ads-admob';

class StatistiquesScreen extends React.Component {
    state = {
        globalData: [],
        loaded: false
    };
    async getGlobalData() {
        await fetch("https://covid-19-data.p.rapidapi.com/totals?format=undefined", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                "x-rapidapi-key": "2a1b808525msh0edd754ff469c61p112db7jsn8be3a979d471"
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                globalData: responseJson
            })
        })
        .catch(err => {
            console.log(err);
        });
        this.setState({
            loaded: true
        })
        
    }
    componentDidMount() {
        this.getGlobalData();
    };
    bannerError() {
    };
    renderCases() {
        return (
            <View style={styles.global}>
                <View style={styles.titleBox}>
                    <AntDesign name="eye" color="black" size={28} />
                    <Text style={styles.textTitle}>   Statistiques</Text>
                </View>
                {this.state.loaded ?
                <View style={styles.viewInfos}>
                    <View style={styles.viewText}>
                        <Text>Statistiques mondiales</Text>
                    </View>
                    <View style={styles.viewSquareInfos}>
                        <View style={[styles.viewPartStats, {borderBottomColor: colors.lightgrey2, borderBottomWidth: 0.5}]}>
                            <View style={styles.viewLabelStats}>
                                <Text style={styles.textLabelStats}>Cas confirmés</Text>
                            </View>
                            <View style={styles.viewNbStats}>
                                <Text style={styles.textNbStats}>{this.state.globalData[0].confirmed}</Text>
                            </View>
                        </View>
                        <View style={[styles.viewPartStats, {borderBottomColor: colors.lightgrey2, borderBottomWidth: 0.5}]}>
                            <View style={styles.viewLabelStats}>
                                <Text style={styles.textLabelStats}>Cas critiques</Text>
                            </View>
                            <View style={styles.viewNbStats}>
                                <Text style={styles.textNbStats}>{this.state.globalData[0].critical}</Text>
                            </View>
                        </View>
                        <View style={[styles.viewPartStats, {borderBottomColor: colors.lightgrey2, borderBottomWidth: 0.5}]}>
                            <View style={styles.viewLabelStats}>
                                <Text style={styles.textLabelStats}>Décès</Text>
                            </View>
                            <View style={styles.viewNbStats}>
                                <Text style={[styles.textNbStats, {color: colors.red}]}>{this.state.globalData[0].deaths}</Text>
                            </View>
                        </View>
                        <View style={styles.viewPartStats}>
                            <View style={styles.viewLabelStats}>
                                <Text style={styles.textLabelStats}>Soignés</Text>
                            </View>
                            <View style={styles.viewNbStats}>
                                <Text style={[styles.textNbStats, {color: colors.green2}]}>{this.state.globalData[0].recovered}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                :
                <View style={styles.viewInfos}>
                    <View style={styles.viewSquareInfos}>
                        <ActivityIndicator size="small" color="#000000" />
                    </View>
                </View>}
                <View style={styles.viewBottom}>
                </View>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.global}>
                {this.renderCases()}
                {/* <AdMobBanner
                    style={styles.bottomBanner}
                    bannerSize="fullBanner"
                    adUnitID="***"
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={(error) => console.log(error)} /> */}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    bottomBanner: {
        position: "absolute",
        bottom: 0
    },
    global: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewInfos: {
        flex: 5,
        width: '100%',
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewSquareInfos: {
        flex: 10,
        width: '80%',
        height: '90%',
        backgroundColor: colors.lightgrey1,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 12.84,

        elevation: 5,
        borderColor: colors.grey1,
        borderWidth: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewPartStats: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    viewLabelStats: {
        flex: 1,
    },
    viewNbStats: {
        flex: 1,
        alignItems: 'flex-end'
    },
    textLabelStats: {
        color: colors.grey2,
        fontSize: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 12.84,

        elevation: 5,
    },
    textNbStats: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    viewBottom: {
        flex: 1,
        width: '100%',
    },
    textTitle: {
        fontSize: 32,
        color: 'black',
        fontWeight: 'bold'
    },
    titleBox: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
});

export default StatistiquesScreen;