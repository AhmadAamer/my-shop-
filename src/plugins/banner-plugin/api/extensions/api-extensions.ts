import gql from "graphql-tag";

export const shopApiExtensions = gql`
  type Banner implements Node {
    id: ID!
    position: Int!
    page: Int!
    title: String
    url: String
    image: Asset
    translations: [BannerTranslation]!
  }

  type BannerTranslation {
    id: ID!
    languageCode: LanguageCode!
    image: Asset!
    title: String
  }

  input BannerTranslationInput {
    languageCode: LanguageCode!
    image: Int!
    title: String
  }

  input BannerInput {
    position: Int!
    page: Int!
    title: String
    url: String
    translations: [BannerTranslationInput!]!
  }

  extend type Query {
    banners(page: Int!): [Banner!]!
    banner(bannerId: ID!): Banner!
  }
`;
