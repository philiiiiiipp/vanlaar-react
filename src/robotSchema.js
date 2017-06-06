/* @flow */

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInterfaceType,
  GraphQLList,
} from 'graphql';

import fs from 'fs';
import path from 'path';

const ROBOTS = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../robots.json')).toString())
  .map((robot) => {
    // Clean up the robot object;
    robot.id = robot.id.$oid;
    return robot;
  });

/**
 * Robot are robots.
 *
 * This implements the following type system shorthand:
 *   interface Robot {
 *     id: String!
 *     picture: String
 *     name: String
 *     orgin: String
 *     catchphrase: String
 *   }
 */
const machineInterface = new GraphQLInterfaceType({
  name: 'Machine',
  description: 'A machine',
  fields: () => ({
    picture: {
      type: GraphQLString,
      description: 'The name of the robot.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the robot.',
    },
    origin: {
      type: GraphQLString,
      description: 'The origin of the robot.',
    },
    catchphrase: {
      type: GraphQLString,
      description: 'The catchphrase of the robot.',
    }
  }),
  resolveType(machine) {
    if (machine.type === 'Robot') {
      return robotType;
    }
  },
});

const robotType = new GraphQLObjectType({
  name: 'Robot',
  description: 'A mechanical creature.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the robot.',
    },
    picture: {
      type: GraphQLString,
      description: 'The name of the robot.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the robot.',
    },
    origin: {
      type: GraphQLString,
      description: 'The origin of the robot.',
    },
    catchphrase: {
      type: GraphQLString,
      description: 'The catchphrase of the robot.',
    }
  }),
  interfaces: [ machineInterface ]
});

const allRobotsType = new GraphQLObjectType({
  name: 'Robots',
  description: 'Get all robots at once',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'The id of the robot.',
    },
    picture: {
      type: GraphQLString,
      description: 'The name of the robot.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the robot.',
    },
    origin: {
      type: GraphQLString,
      description: 'The origin of the robot.',
    },
    catchphrase: {
      type: GraphQLString,
      description: 'The catchphrase of the robot.',
    }
  }),
  interfaces: [ machineInterface ]
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    allRobots: {
      type: new GraphQLList(allRobotsType),
      resolve: (root) => ROBOTS,
    },
    robot: {
      type: robotType,
      args: {
        id: {
          description: 'id of the robot',
          type: new GraphQLNonNull(GraphQLString),
        }
      },
      resolve: (root, { id }) => ROBOTS.find(robot => robot.id === id),
    },
  })
});

const RobotSchema = new GraphQLSchema({
  query: queryType,
  types: [ robotType ],
});

export default RobotSchema;
