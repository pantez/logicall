import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import {
  Container,
  Grid,
  Text,
  Button,
  Col,
  Row,
  H1,
  H3,
  // Body,
  View,
  Body,
  Card,
  CardItem,
  Content,
  List,
} from "native-base";
import { useQuery } from "react-apollo";
import { Actions } from "react-native-router-flux";
import moment from "moment-timezone";
import EmptyIcon from "../components/icons/EmptyIcon";
import schema from "../utils/schema";
import NoData from "../components/NoData";
import FixedContainer from "../components/FixedContainer";
import AvatarItem from "../components/AvatarItem";

const styles = StyleSheet.create({
  col: {
    flex: 1,
  },
  row: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  header: {
    marginTop: 8,
    color: "#536DFE",
  },
  bold: {
    fontWeight: "bold",
  },
});

function Page() {
  const { loading, error, data } = useQuery(schema.query.me);

  if (loading) {
    return (
      <Container>
        <StatusBar />
        <Text>loading</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <StatusBar />
        <Text>error</Text>
      </Container>
    );
  }

  if (!data.me.receiveOrders?.length) {
    return (
      <Container>
        <StatusBar />
        <NoData
          icon={<EmptyIcon height="30%" />}
          title="No Orders Here!"
          subtitle="Do you want to create an order now?"
          button={(
            <Button onPress={() => Actions.createOrder1SelectReceiver()}>
              <Text>Create Order</Text>
            </Button>
          )}
        />
      </Container>
    );
  }
  return (
    <Container>
      <StatusBar />
      <Content>
        <FixedContainer pad>
          <H3 style={{ paddingTop: 12 }}>Orders</H3>
          {data.me.receiveOrders.map((order) => (
            <Card>
              <CardItem>
                <Body>
                  <H3>Receive</H3>
                </Body>
              </CardItem>
              <AvatarItem item={order.sender} />
              <CardItem>
                <Body>
                  <Text>{order.status}</Text>
                  <Text note>
                    {`created ${moment.tz(parseInt(order.createdAt), "Asia/Hong_Kong").format("YYYY-MM-DD HH:mm")}`}
                  </Text>
                </Body>
              </CardItem>
            </Card>
          ))}
          {/* <Text>{JSON.stringify(data.me.receiveOrders)}</Text> */}
        </FixedContainer>
      </Content>
    </Container>
  );
}

export default Page;