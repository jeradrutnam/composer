/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import log from 'log';
import { packageDefinition } from '../../configs/designer-defaults';
import ASTFactory from '../../ast/ballerina-ast-factory';

class ImportDeclarationDimensionCalculatorVisitor {

    canVisit(node) {
        log.info('can visit ImportDeclarationDimensionCalculatorVisitor');
        return true;
    }

    beginVisit(node) {
        log.info('begin visit ImportDeclarationDimensionCalculatorVisitor');
    }

    visit(node) {
        log.info('visit ImportDeclarationDimensionCalculatorVisitor');
    }

    endVisit(node) {
        log.info('end visit ImportDeclarationDimensionCalculatorVisitor');
        let viewState = node.getViewState();
        viewState.bBox.h = 0;
        viewState.bBox.w = 0;
    }
}

export default ImportDeclarationDimensionCalculatorVisitor;
