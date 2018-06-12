/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    Text,
    ActivityIndicator,
    FlatList,
    Dimensions,
    View
} from 'react-native';
const { height, width } = Dimensions.get('window');

import { getAdId, getTimeSince } from "../utils/utils";
import { SERVER_BASE_URL } from "../networkhandler/networkHandler";


type Props = {};
export default class Catalog extends Component<Props> {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.renderAd = this.renderAd.bind(this);
    }

    adUrl(index) {
        return SERVER_BASE_URL + '/ads/?r=' + getAdId(index);

    }

    renderAd(index) {
        let url = this.adUrl(index)
        return (
            <Image
                style={styles.ad}
                resizeMode={'cover'}
                source={{ uri: url }}
            />
        )
    }

    renderItem({ item, index }) {
        let size = { fontSize: item.size };
        return (
            <View>
                <View style={styles.item}
                    key={index}>
                    <View style={styles.emojiContainer}>
                        <Text style={[styles.emoji, size]}>
                            {item.face}
                        </Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.textStyle}>
                            Price: ${item.price / 100}
                        </Text>
                        <Text style={styles.textStyle}>
                            Size: {item.size}px
                    </Text>
                    </View>
                    <Text style={styles.dateText}>
                        {getTimeSince(item.date)}
                    </Text>

                </View>
                {((index + 1) % 20 == 0) && this.renderAd(index)}
            </View>
        )
    }

    renderFooter() {
        let { endOfCatalog } = this.props;

        if (endOfCatalog) {
            return (
                <View style={styles.footer}>
                    <Text style={styles.textStyle}>~ end of catalogue ~</Text>
                </View>
            )
        }
        else {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator
                        color="#00BFFF"
                        animating={true}
                        size="large"
                    />
                    <Text style={styles.textStyle}> Loading... </Text>
                </View>
            )
        }
    }

    render() {
        let { endOfCatalog, products } = this.props;
        return (
            <FlatList
                data={products}
                onEndThreshold={height}
                onEndReached={() => { !endOfCatalog && this.props.loadMoreProducts() }}
                keyExtractor={(item, index) => item.id}
                renderItem={this.renderItem}
                ListFooterComponent={this.renderFooter}
                style={styles.container}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emoji: {
        color: '#FFA500',
        padding: 10,
    },
    emojiContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    item: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        paddingVertical: 15,
    },
    textStyle: {
        fontSize: 20,
        color: 'black'
    },
    dateText: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'right',
        marginHorizontal: 25,
        paddingTop: 10,
    },
    ad: {
        width: '95%',
        height: 200,
        backgroundColor: '#f0f0f0',
        margin: 10,
    },
    content: {
        flex: 1,
        marginHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },

});
