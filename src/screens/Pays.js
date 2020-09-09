import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../const/Colors';
import { AdMobBanner } from 'expo-ads-admob';
import CountryPicker, { getAllCountries, getCallingCode } from 'react-native-country-picker-modal'

class PaysScreen extends React.Component {
    state = {
        selectedCountry: [],
        loaded: false,
    };
    async getCountryData(country) {
        this.setState({
            loaded: false
        })
        console.log("responseJson");
        await fetch(`https://covid-19-data.p.rapidapi.com/country/code?format=undefined&code=${country}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                "x-rapidapi-key": "2a1b808525msh0edd754ff469c61p112db7jsn8be3a979d471"
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                selectedCountry: responseJson
            })
            console.log(responseJson);
        })
        .catch(err => {
            console.log(err);
        });
        this.setState({
            loaded: true
        })
    }
    componentDidMount() {

    };
    changeCountry(data) {
        console.log(data);
        this.getCountryData(data.cca2)
    };
    renderCases() {
        return (
            <View style={styles.global}>
                <View style={styles.titleBox}>
                    <AntDesign name="linechart" color="black" size={28} />
                    <Text style={styles.textTitle}>   Analyse par Pays</Text>
                </View>
                <View style={styles.viewInfos}>
                    <View style={styles.viewButtonSelect}>
                        <CountryPicker
                            placeholder="Cliquer ici pour séléctionner un pays"
                            withEmoji
                            withFilter
                            onSelect={(data) => this.changeCountry(data)}
                        />
                    </View>
                    <View style={styles.viewGraph}>
                        {(getAllCountries !== undefined && getCallingCode !== undefined && this.state.loaded) ?
                        <View style={styles.viewSquareInfos}>
                            <View style={[styles.viewPartStats, {borderBottomColor: colors.lightgrey2, borderBottomWidth: 0.5}]}>
                                <Text style={styles.textTitleCountry}>{this.state.selectedCountry[0].country}</Text>
                            </View>
                            <View style={[styles.viewPartStats, {borderBottomColor: colors.lightgrey2, borderBottomWidth: 0.5}]}>
                                <View style={styles.viewLabelStats}>
                                    <Text style={styles.textLabelStats}>Cas confirmés</Text>
                                </View>
                                <View style={styles.viewNbStats}>
                                    <Text style={styles.textNbStats}>{this.state.selectedCountry[0].confirmed}</Text>
                                </View>
                            </View>
                            <View style={[styles.viewPartStats, {borderBottomColor: colors.lightgrey2, borderBottomWidth: 0.5}]}>
                                <View style={styles.viewLabelStats}>
                                    <Text style={styles.textLabelStats}>Cas critiques</Text>
                                </View>
                                <View style={styles.viewNbStats}>
                                    <Text style={styles.textNbStats}>{this.state.selectedCountry[0].critical}</Text>
                                </View>
                            </View>
                            <View style={[styles.viewPartStats, {borderBottomColor: colors.lightgrey2, borderBottomWidth: 0.5}]}>
                                <View style={styles.viewLabelStats}>
                                    <Text style={styles.textLabelStats}>Décès</Text>
                                </View>
                                <View style={styles.viewNbStats}>
                                    <Text style={[styles.textNbStats, {color: colors.red}]}>{this.state.selectedCountry[0].deaths}</Text>
                                </View>
                            </View>
                            <View style={styles.viewPartStats}>
                                <View style={styles.viewLabelStats}>
                                    <Text style={styles.textLabelStats}>Soignés</Text>
                                </View>
                                <View style={styles.viewNbStats}>
                                    <Text style={[styles.textNbStats, {color: colors.green2}]}>{this.state.selectedCountry[0].recovered}</Text>
                                </View>
                            </View>
                        </View>
                        :
                        <View style={styles.viewSquareInfos}>
                            <ActivityIndicator size="small" color="#000000" />
                        </View>}
                    </View>
                </View>
                <View style={styles.viewBottom}>
                </View>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.global}>
                {this.renderCases()}
                <AdMobBanner
                    style={styles.bottomBanner}
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-8826340269904242/7931673480"
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={(error) => console.log(error)} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    textTitleCountry: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold'
    },
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
    viewButtonSelect: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewGraph: {
        flex: 29,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewSquareInfos: {
        // flex: 1,
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

export default PaysScreen;