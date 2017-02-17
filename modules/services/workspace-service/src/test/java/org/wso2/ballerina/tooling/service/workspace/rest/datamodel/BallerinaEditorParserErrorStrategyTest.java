/*
*  Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
*  WSO2 Inc. licenses this file to you under the Apache License,
*  Version 2.0 (the "License"); you may not use this file except
*  in compliance with the License.
*  You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing,
*  software distributed under the License is distributed on an
*  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
*  KIND, either express or implied.  See the License for the
*  specific language governing permissions and limitations
*  under the License.
*/

package org.wso2.ballerina.tooling.service.workspace.rest.datamodel;


import com.google.gson.JsonObject;
import org.antlr.v4.runtime.ANTLRInputStream;
import org.antlr.v4.runtime.CommonTokenStream;
import org.wso2.ballerina.core.model.BLangPackage;
import org.wso2.ballerina.core.model.BallerinaFile;
import org.wso2.ballerina.core.model.GlobalScope;
import org.wso2.ballerina.core.model.builder.BLangModelBuilder;
import org.wso2.ballerina.core.model.types.BTypes;
import org.wso2.ballerina.core.parser.BallerinaLexer;
import org.wso2.ballerina.core.parser.BallerinaParser;
import org.wso2.ballerina.core.parser.antlr4.BLangAntlr4Listener;
import org.wso2.ballerina.core.runtime.internal.BuiltInNativeConstructLoader;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

public class BallerinaEditorParserErrorStrategyTest {

    public static void main(String[] args) {
        try {
            File file = new File(BallerinaEditorParserErrorStrategyTest.class.getClassLoader().getResource("samples/parser/InvalidBal.bal")
                    .getFile());
            InputStream stream = new FileInputStream(file);
            ANTLRInputStream antlrInputStream = new ANTLRInputStream(stream);
            BallerinaLexer ballerinaLexer = new BallerinaLexer(antlrInputStream);
            CommonTokenStream ballerinaToken = new CommonTokenStream(ballerinaLexer);

            BallerinaParser ballerinaParser = new BallerinaParser(ballerinaToken);
            BallerinaEditorParserErrorStrategy errorStrategy = new BallerinaEditorParserErrorStrategy();
            ballerinaParser.setErrorHandler(errorStrategy);

            GlobalScope globalScope = GlobalScope.getInstance();
            BTypes.loadBuiltInTypes(globalScope);
            BLangPackage bLangPackage = new BLangPackage(globalScope);

            BLangModelBuilder bLangModelBuilder = new BLangModelBuilder(bLangPackage);
            BLangAntlr4Listener ballerinaBaseListener = new BLangAntlr4Listener(bLangModelBuilder);
            ballerinaParser.addParseListener(ballerinaBaseListener);
            ballerinaParser.compilationUnit();
            BallerinaFile bFile = bLangModelBuilder.build();

            BuiltInNativeConstructLoader.loadConstructs(globalScope);

            JsonObject response = new JsonObject();
            BLangJSONModelBuilder jsonModelBuilder = new BLangJSONModelBuilder(response);
            bFile.accept(jsonModelBuilder);

            String responseString = response.toString();
            System.out.println(responseString);
        } catch (Exception ex) {
            String error = ex.getMessage();
            System.out.println(error);
        }
    }
}