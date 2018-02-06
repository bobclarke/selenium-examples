

node() {
	checkout scm

	dir('BDD'){
		echo "WORKSPACE is ${env.WORKSPACE}"
		sauce("sauceCredentialsID") {
			withEnv([ "appname=sauce-test-1", "RESULTSDIR=${env.WORKSPACE}/tests/acceptance/wdio/utilities/output", "GULP_OPTION=runTestsWithSauce"]) 

			{ 
				sh "curl https://saucelabs.com/versions.json || true"
				echo "FWC >>> using tunnel-identifier of my_tunnel_id"
				sauceconnect(useGeneratedTunnelIdentifier: false, verboseLogging: true, sauceConnectPath: "/usr/local/bin/sc", options: "--tunnel-identifier my_tunnel_identifyer") 

				{
					sh "rm -rf ${RESULTSDIR} && mkdir -p ${RESULTSDIR}"
					echo "TUNNEL_IDENTIFIER is  ${env.TUNNEL_IDENTIFIER}"
					echo "running gulp"
					sh "/Users/bclar6/git/sauce/BDD/node_modules/.bin/gulp runTestsWithSauce"
				}  //end sauceconnect
			}  //end withEnv
		}  //end sauce
	}		
}



