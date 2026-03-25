import {Tabs} from "expo-router";
import {Feather} from "@expo/vector-icons";
import AirPurifierDataProvider from "@/context/context";

export default function RootLayout() {
    return (
        <AirPurifierDataProvider>
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#7FC3D9",
                tabBarInactiveTintColor: "#6B7176",
                tabBarStyle: {
                    height: 78,
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderTopWidth: 1,
                    borderTopColor: "#E5E5E5",
                    backgroundColor: "#FFFFFF",
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    marginBottom: 6,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="values"
                options={{
                    title: "Werte",
                    tabBarIcon: ({ color }) => (
                        <Feather name="bar-chart-2" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="insights"
                options={{
                    title: "Insights",
                    tabBarIcon: ({ color }) => (
                        <Feather name="lightbulb" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="history"
                options={{
                    title: "Verlauf",
                    tabBarIcon: ({ color }) => (
                        <Feather name="clock" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => (
                        <Feather name="settings" size={24} color={color} />
                    ),
                }}
            />

        </Tabs>
        </AirPurifierDataProvider>
    );
}
