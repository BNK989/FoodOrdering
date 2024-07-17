import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Tabs, withLayoutContext } from "expo-router"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function OrderListNavigator() {
    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
            <TopTabs >
                <TopTabs.Screen name="index" options={{ title: 'Active' }} />
                <TopTabs.Screen name="archive" options={{ title: 'Archive' }} />
            </TopTabs>
        </SafeAreaView>
    )
}