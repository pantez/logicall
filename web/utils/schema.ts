import gql from "graphql-tag";

export const schema = {
  query: {
    me: gql`{
      me {
        userId
        firstName
        lastName
        email
        role
        phone
        username
      }
    }`,
    users: gql`query($search: String!) {
      users(search: $search) {
        userId
        firstName
        lastName
        email
        phone
        role
        username
      }
    }`,
    order: gql`query($orderId: String ) {
      order(orderId: $orderId) {
        suggestedPolylines
        estimatedDuration
        duration
        orderId
        sender {
          userId
          username
          firstName
          lastName
          email
          phone
        }
        receiver {
          userId
          username
          firstName
          lastName
          email
          phone
        }
        sendAddress
        sendLatLng {
          latitude
          longitude
        }
        receiveAddress
        receiveLatLng {
          latitude
          longitude
        }
        status
        comments
        logs {
          orderLogId
          status
          comments
          createdAt
        }
        jobs {
          polylines
          duration
          driver {
            userId
            username
            firstName
            lastName
          }
          status
        }
      }
    }`,
    orders: gql `query {
      orders {
        suggestedPolylines
        estimatedDuration
        duration
        orderId
        sender {
          userId
          username
          firstName
          lastName
          email
          phone
        }
        receiver {
          userId
          username
          firstName
          lastName
          email
          phone
        }
        jobs {
          polylines
          duration
          driver {
            userId
            username
            firstName
            lastName
          }
        }
        sendAddress
        sendLatLng {
          latitude
          longitude
        }
        receiveAddress
        receiveLatLng {
          latitude
          longitude
        }
        status
        comments
      }
    }`
  },
  mutation: {
    updateOrderStatus: gql`mutation($input: UpdateOrderStatusInput) {
      updateOrderStatus(input: $input) {
        suggestedPolylines
        estimatedDuration
        duration
        orderId
        sender {
          userId
          username
          firstName
          lastName
        }
        receiver {
          userId
          username
          firstName
          lastName
        }
        jobs {
          polylines
          duration
          driver {
            userId
            username
            firstName
            lastName
          }
        }
        sendAddress
        sendLatLng {
          latitude
          longitude
        }
        receiveAddress
        receiveLatLng {
          latitude
          longitude
        }
        status
        comments
      }
    }`,
    signIn: gql`mutation($input: SignInInput) {
      signIn(input: $input) {
        userId
        firstName
        lastName
        email
        role
        username
      }
    }`,
    signUp: gql`mutation($input: SignUpInput) {
      signUp(input: $input) {
        userId
        firstName
        lastName
        email
        role
        username
      }
    }`,
    signOut: gql`mutation {
      signOut
    }`,
    requestCurrentLocation: gql`mutation {
      requestCurrentLocation
    }`
  },
  subscription: {
    currentLocationResponsed: gql`subscription {
      currentLocationResponsed {
        user {
          userId
          firstName
          lastName
          email
          role
          phone
          username
        }
        latLng {
          latitude
          longitude
        }
      }
    }`,
    orderCreated: gql`subscription {
      orderCreated {
        suggestedPolylines
        estimatedDuration
        duration
        orderId
        sender {
          userId
          username
          firstName
          lastName
        }
        receiver {
          userId
          username
          firstName
          lastName
        }
        jobs {
          polylines
          duration
          driver {
            userId
            username
            firstName
            lastName
          }
        }
        sendAddress
        sendLatLng {
          latitude
          longitude
        }
        receiveAddress
        receiveLatLng {
          latitude
          longitude
        }
        status
        comments
      },
    }`,
    orderStatusUpdated: gql`subscription {
      orderStatusUpdated {
        orderId
      }
    }`
  }
};

export default schema;
