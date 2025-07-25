import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
    <View className="p-5">
      <View className="bg-white p-5 rounded-xl shadow-md">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-8">
          Absensi
        </Text>

        <View className="flex-row justify-between">
          {/* Clock In Button */}
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center bg-green-600 py-3 px-5 rounded-lg shadow-md mr-3"
            onPress={handleClockIn}
          >
            <Ionicons name="log-in-outline" size={24} color="#fff" />
            <Text className="text-white text-lg font-semibold ml-2">
              Clock In
            </Text>
          </TouchableOpacity>

          {/* Clock Out Button */}
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-3 px-5 rounded-lg shadow-md ml-3 ${
              clockInTime ? 'bg-red-600' : 'bg-gray-300'
            }`}
            onPress={handleClockOut}
            disabled={!clockInTime}
          >
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text className="text-white text-lg font-semibold ml-2">
              Clock Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ClockInOut;
