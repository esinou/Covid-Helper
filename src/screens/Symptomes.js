import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../const/Colors';
import { AdMobBanner } from 'expo-ads-admob';

class SymptomesScreen extends React.Component {
    state = {
        symptomes: [
            {"nom":"Fièvre", "pr":88},
            {"nom":"Toux sèche", "pr":68},
            {"nom":"Expectorations ou flegme épais des poumons", "pr":33},
            {"nom":"Essoufflement ", "pr":19},
            {"nom":"Douleurs osseuses ou articulaires", "pr":15},
            {"nom":"Maux de gorge", "pr":14},
            {"nom":"Maux de tête", "pr":14},
            {"nom":"Frissons ", "pr":11},
            {"nom":"Nausées ou vomissements", "pr":5},
            {"nom":"Nez bouché", "pr":5},
            {"nom":"Diarrhée ", "pr":4},
            {"nom":"Toux de sang", "pr":1},
            {"nom":"Yeux gonflés", "pr":1}
        ]
    };
    render() {
        return (
            <View style={styles.global}>
                <View style={styles.titleBox}>
                    <AntDesign name="warning" color="black" size={28} />
                    <Text style={styles.textTitle}>   Symptomes</Text>
                </View>
                <View style={styles.viewInfos}>
                    <ScrollView style={{flex: 1, width: '100%', height: '100%'}}>
                        {this.state.symptomes.map((element, index) =>
                            <View style={styles.barGlobal} key={index}>
                                <View style={[styles.barInside, {width: `${50 + element.pr / 2}%`}]}>
                                    <View style={styles.flexInside}>
                                        <Text style={styles.textName}>{element.nom}</Text>
                                    </View>
                                    <View style={styles.flexPr}>
                                        <Text style={styles.textAutre}> - </Text>
                                        <Text style={styles.textPr}>{element.pr}</Text>
                                        <Text style={styles.textAutre}>%</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                        <View style={{width: '100%', height: '50%'}}/>
                    </ScrollView>
                </View>
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
    textName: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textAutre: {
        color: 'white',
        fontSize: 14,
    },
    textPr: {
        color: colors.beige,
        fontSize: 16,
        fontWeight: 'bold'
    },
    flexInside: {
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    flexPr: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    bottomBanner: {
        position: "absolute",
        bottom: 0
    },
    barGlobal: {
        width: '100%',
        height: '18%',
        alignItems: 'flex-start'
        // backgroundColor: 'red'
    },
    barInside: {
        width: '100%',
        height: '80%',
        paddingLeft: '5%',
        justifyContent: 'flex-start',
        alignItems:'center',
        backgroundColor: colors.green3,
        borderBottomRightRadius: 30,
        borderTopEndRadius: 30,
        borderRightColor: colors.lightgrey2,
        borderRightWidth: 5,
        flexDirection: 'row',
    },
    global: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewInfos: {
        flex: 6,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
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

export default SymptomesScreen;