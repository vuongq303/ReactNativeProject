import React, { memo } from "react";

function Body({ data }) {
  return (
    <View>
      {console.log("render body")}
      <View style={{ margin: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.priceD]}>₫</Text>
          <Text style={styles.price}>
            {numberService(data[0].info[0].price)}
          </Text>
        </View>
        <Text style={styles.border}> Buy to received gift</Text>
      </View>
      {/*  */}
      <View style={styles.star}>
        <Text style={styles.like}> Favorite+ </Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={{ marginRight: 10, fontSize: 18 }}
        >
          {data[0].productName}
        </Text>
      </View>
      {/*  */}
      <View style={styles.star}>
        <MaterialIcons name="star" color="#ADFF2F" size={20} />
        <Text> {data[0].rating} /5 </Text>
        <Text style={{ opacity: 0.2 }}> | </Text>
        <Text>Sold {data[0].sold}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.voucher}>
        <Text>Voucher of shop</Text>
        <MaterialIcons name="arrow-right" size={24} />
      </View>
      <View style={styles.line} />
      <View style={styles.voucher}>
        <Text>SPayLater</Text>
        <MaterialIcons name="arrow-right" size={24} />
      </View>
      <View style={styles.line} />
      <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
        <Text>Transport fee $0</Text>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ opacity: 0.5 }}>
            Free shipping for orders from $100.000
          </Text>
          <Text style={{ opacity: 0.5 }}>
            Receive goods as soon as possible
          </Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.voucher}>
        <Text>Products details</Text>
        <MaterialIcons name="arrow-right" size={24} />
      </View>
      <View style={styles.line} />
    </View>
  );
}
export default memo(Body);
