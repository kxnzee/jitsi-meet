import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { IReduxState } from '../../../app/types';
import Label from '../../../base/label/components/web/Label';

/**
 * Displays the build id of the Focus (jitsi-control) serving the current
 * conference, when known. Renders nothing when the value is absent, empty,
 * or contains only whitespace.
 *
 * @returns {ReactElement|null}
 */
const FocusBuildIdLabel = () => {
    const { t } = useTranslation();
    const focusBuildId = useSelector((state: IReduxState) => {
        const properties = state['features/base/conference'].properties;

        if (!properties || !('focus-build-id' in properties)) {
            return undefined;
        }

        const value = (properties as Record<string, unknown>)['focus-build-id'];

        return typeof value === 'string' && value.trim() ? value : undefined;
    });

    if (!focusBuildId) {
        return null;
    }

    return (
        <Label text = { t('info.focusBuildId', { buildId: focusBuildId }) } />
    );
};

export default FocusBuildIdLabel;
