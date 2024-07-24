import gql from "graphql-tag";

export const shopApiExtensions = gql`
  type Banner implements Node {
    id: ID!
    title: String
    description: String
    position: Int
    imageAr: Asset
    imageEn: Asset
    urlAr: String
    urlEn: String
  }

  input BannerInput {
    title: String!
    description: String
    position: Int
    imageArId: ID!
    imageEnId: ID!
    urlAr: String
    urlEn: String
  }

  extend type Query {
    banners(language: String!, page: Int!): [Banner!]!
    banner(bannerId: ID!): Banner!
  }

  extend type Mutation {
    addBanner(input: BannerInput!): Banner!
  }
`;
