# Suitecloud Developmet Framework

A tool that helps with version control using git and faster and more reliable update,download and creating suitescripts through VScode without using the traditional copy paste everytime you want to make update to an script on netsuite.

---

# How to deploy

1 - Make sure you have Oracle Netsuite Suite Cloud Extension on VS

2 - Press ctrl + Shift + P , then choose create project

3 - Choose directory of the project

## MAKE SURE:

npm install -g @oracle/suitecloud-cli (in cmd)

4 - suitecloud account:setup (to setup account) (prefered to use the visual studio UI shortcut)

## TO DOWNLOAD A SCRIPT

E.X: suitecloud file:import --paths "/SuiteScripts/az_svcs_rl_mt_my_restlet.js"

## TO UPLOAD AN UPDATED SCRIPT

Press ctrl + Shift + P , then choose upload file

## TO CREATE A SCRIPT AND UPLOAD IT

1 - Press ctrl + Shift + P
2 - Create suitescript file
3 - Choose suitescript type
4 - (OPTIONAL) Add modules
5 - write the file name and choose its directory on Netsuite
6- Press ctrl + Shift + P again
7 - Choose add dependency reference to the manifest
8 - Create XML file in Objects folder for script deployment
9 - Deploy the script, E.X:

                            <clientScript scriptid="customscript_az_svcs_cs_mt_sdf_test">
                                <name>AZ SVCS CS MT SDF Test</name>
                                <notifyowner>F</notifyowner>
                                <scriptfile>[/SuiteScripts/az_svcs_cs_mt_sdf_test.js]</scriptfile>
                                <scriptdeployments>
                                    <scriptdeployment scriptid="customdeploy_az_svcs_cs_mt_sdf_test">
                                        <isdeployed>T</isdeployed>
                                        <loglevel>DEBUG</loglevel>
                                        <recordtype>[customrecord_az_emp_mahmoud]</recordtype>
                                        <status>RELEASED</status>
                                    </scriptdeployment>
                                </scriptdeployments>
                        </clientScript>

10 - Go to the manifest.xml file and add the targeted record and the script file path

                            <manifest projecttype="ACCOUNTCUSTOMIZATION">
                                <projectname>Reference SDF</projectname>
                                <frameworkversion>1.0</frameworkversion>
                                <dependencies>
                                    <features>
                                        <feature required="false">CREATESUITEBUNDLES</feature>
                                    </features>
                                    <objects>
                                        <object>customrecord_az_emp_mahmoud</object> // Target record
                                    </objects>
                                    <files>
                                        <file>/SuiteScripts/az_svcs_cs_mt_sdf_test.js</file> // File Path
                                    </files>
                                </dependencies>
                            </manifest>

11 - Press ctrl + Shift + P, Upload the script to file cabient before deployment
12 - Press ctrl + Shift + P, choose deploy project

## YOU MAYBE, JUST MAYBE, NEED TO APPLY ROLES FOR THE SCRIPT TO RUN MANUALLY FROM NETSUITE

---

## Authors

[Mahmoud Talaat](https://www.linkedin.com/in/mahmoudtalaat21/) – NetSuite Developer

[Kirollos Ayman](https://www.linkedin.com/in/keroloseid/) – NetSuite Developer

Feel free to connect or contribute!

Let me know if you have special focus (e.g., SuiteQL, OAuth, or CSV imports) and I’ll tailor it even more!
