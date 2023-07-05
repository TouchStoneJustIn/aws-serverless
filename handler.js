'use strict';
const AWS = require('aws-sdk');

const ec2 = new AWS.EC2();
// Start EC2 instances

async function startInstances(instanceIds) {
    const params = {
        InstanceIds: instanceIds,
    };

    try {
        await ec2.startInstances(params).promise();
        console.log('EC2 instances started:', instanceIds);
    } catch (error) {
        console.error('Error starting EC2 instances:', error);
    }
}
// Stop EC2 instances
async function stopInstances(instanceIds) {
    const params = {
        InstanceIds: instanceIds,
    };

    try {
        await ec2.stopInstances(params).promise();
        console.log('EC2 instances stopped:', instanceIds);
    } catch (error) {
        console.error('Error stopping EC2 instances:', error);
    }
}


module.exports.hello = async (event) => {
    try {
        const { action, instanceIds } = event;

        if (action === 'start') {
            await startInstances(instanceIds);
        } else if (action === 'stop') {
            await stopInstances(instanceIds);
        } else {
            console.warn('Invalid action:', action);
        }

        return {
            statusCode: 200,
            body: 'Success',
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: 'Error',
        };
    }

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
