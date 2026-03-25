import { useState } from "react";
import { Text, View, StyleSheet, Platform, TouchableOpacity, Modal } from "react-native";
import { useAirPurifierData } from "@/context/context";
import {Mode} from "@/models/airPurifierData";
import {Feather} from "@expo/vector-icons";

const modeLabels: Record<Mode, string> = {
  [Mode.AUTO]: "Automatik",
  [Mode.STUFE_1]: "Stufe 1",
  [Mode.STUFE_2]: "Stufe 2",
  [Mode.STUFE_3]: "Stufe 3",
  [Mode.SCHLAF_MODUS]: "Schlafmodus",
};

export default function Index() {
  const { airPurifierDataList, updateMode } = useAirPurifierData();
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const data = airPurifierDataList[0];

  const getAirQualityColor = (pm25: number) => {
    if (pm25 <= 50) return "#00FF41";
    if (pm25 <= 100) return "#1358e0";
    if (pm25 <= 150) return "#FFCC00";
    return "#FF3B30";
  };

  const ledColor = getAirQualityColor(data.pm2_5);

  const MAX_FILTER_HOURS = 3000;
  const remainingHours = Math.max(0, Number(data?.filter_status ?? 0));
  const progressRatio = Math.min(remainingHours / MAX_FILTER_HOURS, 1);
  const progressPercentText = `${Math.round(progressRatio * 100)}%`;

  return (
    <View style={styles.container}>
      <View style={styles.displayModule}>

        <View style={[styles.ledBar, { backgroundColor: ledColor, shadowColor: ledColor }]} />

        <View style={styles.displayPanel}>
          <Text style={styles.pmText}>PM2.5</Text>
          <Text style={styles.valueText}>{data.pm2_5}</Text>
          <Text style={styles.unitText}>µg/m³</Text>
        </View>
      </View>
      <View style={styles.filterCard}>
        <View style={styles.filterHeader}>
          <Text style={styles.filterLabel}>Filterstatus</Text>
          <Text style={styles.filterPercent}>{progressPercentText}</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressRatio * 100}%` }]} />
        </View>
      </View>
      <View style={styles.filterCard}>
        <Text style={styles.filterLabel}>Modus</Text>
        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={() => setIsPickerVisible(true)}
        >
          <Text style={styles.pickerText}>{modeLabels[data.mode]}</Text>
          <Feather name="chevron-down" size={20} color="#6EC0D1" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isPickerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsPickerVisible(false)}
        >
          <View style={styles.modalContent}>
            {(Object.values(Mode) as Mode[]).map((m) => (
              <TouchableOpacity
                key={m}
                style={[
                  styles.modalItem,
                  data.mode === m && styles.modalItemActive
                ]}
                onPress={() => {
                  updateMode(0, m);
                  setIsPickerVisible(false);
                }}
              >
                <Text style={[
                  styles.modalItemText,
                  data.mode === m && styles.modalItemTextActive
                ]}>
                  {modeLabels[m]}
                </Text>
                {data.mode === m && <Feather name="check" size={18} color="#6EC0D1" />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  displayModule: {
    width: 280,
    height: 420,
    backgroundColor: "#B0B0B0",
    borderBottomLeftRadius: 140,
    borderBottomRightRadius: 140,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    paddingTop: 40,
    zIndex: 10,
    borderWidth: 1.5,
    borderColor: "#6EC0D1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  ledBar: {
    width: 180,
    height: 12,
    borderRadius: 6,
    marginBottom: 75,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 12,
  },
  displayPanel: {
    width: 240,
    height: 240,
    borderRadius: 85,
    backgroundColor: "#080808",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 2.5,
    borderColor: "#4A4A4A",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 12,
  },
  pmText: {
    color: "#AAAAAA",
    fontSize: 13,
    fontWeight: "700",
    position: "absolute",
    top: 52,
    left: 42,
  },
  valueText: {
    color: "#FFFFFF",
    fontSize: 110,
    fontWeight: "200",
    fontFamily: "monospace",
    letterSpacing: -2,
    marginTop: 10,
  },
  unitText: {
    color: "#AAAAAA",
    fontSize: 13,
    fontWeight: "500",
    position: "absolute",
    bottom: 52,
    right: 50,
  },
  filterCard: {
    width: 320,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  filterPercent: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6EC0D1",
  },
  progressTrack: {
    width: "100%",
    height: 12,
    backgroundColor: "#EDEFF2",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6EC0D1",
    borderRadius: 8,
  },
  pickerContainer: {
    marginTop: 4,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EDEFF2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    height: 44,
  },
  pickerText: {
    fontSize: 16,
    color: "#222",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  modalItemActive: {
    backgroundColor: "#F0F9FB",
  },
  modalItemText: {
    fontSize: 16,
    color: "#444",
  },
  modalItemTextActive: {
    color: "#6EC0D1",
    fontWeight: "600",
  },
});