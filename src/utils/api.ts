import { gql, GraphQLClient } from 'graphql-request';

export default async function fetchTournamentDetails(tournamentURL: string, token: string) {
  const endpoint = `https://api.start.gg/gql/alpha`;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const slug = extractSlugFromURL(tournamentURL);

  const eventId = await getEventId(slug, graphQLClient);

  const standings = await getEventStandings(eventId, graphQLClient);
  return standings;
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

function extractSlugFromURL(url: string): string {
  return url.replace(/^https?:\/\/start.gg\//, '');
}
