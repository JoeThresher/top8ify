import { gql, GraphQLClient } from 'graphql-request';
import { toast } from 'vue3-toastify';

export default async function fetchTournamentDetails(tournamentURLString: string, token: string) {
  const endpoint = `https://api.start.gg/gql/alpha`;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  interface TournamentInfo {
    eventDetails: { id: string; name: string; numEntrants: string };
    tournamentDetails: { name: string; shortSlug: string; venueAddress: string };
    standings: string[];
  }

  const tournamentInfo: TournamentInfo = {
    eventDetails: { id: '', name: '', numEntrants: '' },
    tournamentDetails: { name: '', shortSlug: '', venueAddress: '' },
    standings: [],
  };

  if (token === '') {
    toast.error('No token provided');
    return tournamentInfo;
  }

  const tournamentURL: URL = new URL(tournamentURLString);

  const slug: string = tournamentURL.pathname.substring(1);
  const slugParts: string[] = slug.split('/');
  if (slugParts.length < 2 || slugParts[0] !== 'tournament') {
    toast.error('Invalid tournament URL format.');
    return tournamentInfo;
  }

  tournamentInfo.eventDetails = await getEventDetails(slug, graphQLClient);
  tournamentInfo.standings = await getEventStandings(tournamentInfo.eventDetails.id, graphQLClient);
  if (slugParts[1]) {
    tournamentInfo.tournamentDetails = await getTournamentDetails(slugParts[1], graphQLClient);
  }

  toast.success('Retreived data for ' + tournamentInfo.tournamentDetails.name);
  return tournamentInfo;
}

async function getEventDetails(slug: string, graphQLClient: GraphQLClient) {
  const query = gql`
    query getEventDetails($slug: String) {
      event(slug: $slug) {
        id
        name
        numEntrants
      }
    }
  `;

  const variables = {
    slug: slug,
  };

  interface Data {
    event: { id: string; name: string; numEntrants: string };
  }

  const data = await graphQLClient.request<Data>(query, variables);
  console.log(data);
  return { id: data.event.id, name: data.event.name, numEntrants: data.event.numEntrants };
}

async function getEventStandings(eventId: string, graphQLClient: GraphQLClient) {
  const query = gql`
    query EventStandings($eventId: ID!, $page: Int!, $perPage: Int!) {
      event(id: $eventId) {
        id
        name
        standings(query: { perPage: $perPage, page: $page }) {
          nodes {
            placement
            entrant {
              id
              name
            }
          }
        }
      }
    }
  `;

  const variables = {
    eventId: eventId,
    page: 1,
    perPage: 8,
  };

  interface Data {
    event: {
      id: string;
      name: string;
      standings: { nodes: Array<{ placement: number; entrant: { id: string; name: string } }> };
    };
  }

  const data = await graphQLClient.request<Data>(query, variables);
  console.log(data);
  const standingsArray = data.event.standings.nodes;
  const playerNames: string[] = [];

  if (!standingsArray) {
    return playerNames;
  }

  for (let i = 0; i < standingsArray.length; i++) {
    const entrantName = standingsArray[i]?.entrant?.name;
    if (entrantName) {
      playerNames.push(entrantName);
    }
  }

  return playerNames;
}

async function getTournamentDetails(tourneySlug: string, graphQLClient: GraphQLClient) {
  const query = gql`
    query GetTournamentDetails($tourneySlug: String!) {
      tournament(slug: $tourneySlug) {
        name
        shortSlug
        venueAddress
      }
    }
  `;

  const variables = {
    tourneySlug: tourneySlug,
  };

  interface Data {
    tournament: {
      name: string;
      shortSlug: string;
      venueAddress: string;
    };
  }

  const data = await graphQLClient.request<Data>(query, variables);
  console.log(data);
  return {
    name: data.tournament.name,
    shortSlug: data.tournament.shortSlug,
    venueAddress: data.tournament.venueAddress,
  };
}
