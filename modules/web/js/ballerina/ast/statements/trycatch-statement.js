/**
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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
import _ from 'lodash';
import log from 'log';
import Statement from './statement';
import FragmentUtils from './../../utils/fragment-utils';

/**
 * Class for try-catch statement in ballerina.
 * @constructor
 */
class TryCatchStatement extends Statement {
    constructor(args) {
        super();
        this.type = "TryCatchStatement";
    }

    /**
     * setter for catch block exception
     * @param {string} exception
     * @param {object} options
     */
    setExceptionType(exception, options) {
        if (!_.isNil(exception)) {
            this.setAttribute('_exceptionType', exception, options);
        } else {
            log.error("Cannot set undefined to the exception.");
        }
    }

    /**
     * getter for catch block exception type
     * @return {string} _exceptionType
     */
    getExceptionType() {
        return this._exceptionType;
    }

    initFromJson(jsonNode) {
        let self = this;
        _.each(jsonNode.children, function (childNode) {
            let child = self.getFactory().createFromJson(childNode);
            self.addChild(child);
            child.initFromJson(childNode);
        });
    }

    setStatementFromString(statementString, callback) {
        const fragment = FragmentUtils.createStatementFragment(statementString);
        const parsedJson = FragmentUtils.parseFragment(fragment);

        if ((!_.has(parsedJson, 'error') || !_.has(parsedJson, 'syntax_errors'))
            && _.isEqual(parsedJson.type, 'try_catch_statement')) {

            this.initFromJson(parsedJson);

            // Manually firing the tree-modified event here.
            // TODO: need a proper fix to avoid breaking the undo-redo
            this.trigger('tree-modified', {
                origin: this,
                type: 'custom',
                title: 'TryCatch Statement Custom Tree modified',
                context: this,
            });

            if (_.isFunction(callback)) {
                callback({isValid: true});
            }
        } else {
            if (_.isFunction(callback)) {
                callback({isValid: false, response: parsedJson});
            }
        }
    }
}

export default TryCatchStatement;

