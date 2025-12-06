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
    id: string;
    name: string;
    standings: string[];
  }

  const tournamentInfo: TournamentInfo = {
    id: '',
    name: '',
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

  tournamentInfo.id = await getEventId(slug, graphQLClient);
  tournamentInfo.standings = await getEventStandings(tournamentInfo.id, graphQLClient);
  if (slugParts[1]) {
    tournamentInfo.name = await getEventName(slugParts[1], graphQLClient);
  }

  toast.success('Retreived data for ' + tournamentInfo.name);
  return tournamentInfo;
}

async function getEventId(slug: string, graphQLClient: GraphQLClient) {
  const query = gql`
    query getEventId($slug: String) {
      event(slug: $slug) {
        id
        name
      }
    }
  `;

  const variables = {
    slug: slug,
  };

  interface Data {
    event: { id: string; name: string };
  }

  const data = await graphQLClient.request<Data>(query, variables);
  console.log(data);
  return data.event.id;
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

async function getEventName(tourneySlug: string, graphQLClient: GraphQLClient) {
  const query = gql`
    query TournamentEvents($tourneySlug: String!) {
      tournament(slug: $tourneySlug) {
        id
        name
        events {
          id
          name
        }
      }
    }
  `;

  const variables = {
    tourneySlug: tourneySlug,
  };

  interface Data {
    tournament: {
      id: string;
      name: string;
      events: Array<{ id: string; name: string }>;
    };
  }

  const data = await graphQLClient.request<Data>(query, variables);
  console.log(data);
  return data.tournament.name;
}
