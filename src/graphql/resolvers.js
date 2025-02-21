import {gql} from 'apollo-boost';

export const typeDefs = gql`
    extend type Mutation {
        ToggleCartHidden: Boolean!
    }
`;

const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`;

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, _context, _info) => {
            const {cartHidden}  =_context.cache.readQuery({
                query: GET_CART_HIDDEN,
            });

            _context.cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden }
            });
            return !cartHidden;
        }
    }
}