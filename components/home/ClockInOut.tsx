import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ClockInOut: React.FC = () => {
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);

  const getCurrentTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString('id-ID', { hour12: false });
  };

  const handleClockIn = () => {
    setClockInTime(getCurrentTime());
    setClockOutTime(null);
  };

  const handleClockOut = () => {
    setClockOutTime(getCurrentTime());
  };

  return (
    <View style={styles.container}>
        <View style={styles.containerContent}>
            <Text style={styles.header}>Absensi</Text>

            <View style={styles.buttonRow}>
                {/* Clock In Button */}
                <TouchableOpacity style={[styles.button, styles.clockIn]} onPress={handleClockIn}>
                <Ionicons name="log-in-outline" size={24} color="#fff" />
                <Text style={styles.buttonText}>Clock In</Text>
                </TouchableOpacity>

                {/* Clock Out Button */}
                <TouchableOpacity
                style={[styles.button, styles.clockOut, !clockInTime && styles.disabled]}
                onPress={handleClockOut}
                disabled={!clockInTime}
                >
                <Ionicons name="log-out-outline" size={24} color="#fff" />
                <Text style={styles.buttonText}>Clock Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  containerContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  clockIn: {
    backgroundColor: '#4CAF50', // hijau
    marginRight: 12,
    flex: 1,
    justifyContent: 'center',
  },
  clockOut: {
    backgroundColor: '#F44336', // merah
    marginLeft: 12,
    flex: 1,
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  },
});

export default ClockInOut;
