import NetInfo from "@react-native-community/netinfo";

export const checkForConnectionOnce = async () => {
  const { isInternetReachable } = await NetInfo.fetch();
  if (isInternetReachable) {
    return true;
  }
  return false;
};
