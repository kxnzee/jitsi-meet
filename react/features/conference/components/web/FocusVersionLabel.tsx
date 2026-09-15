import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { IReduxState } from '../../../app/types';
import Label from '../../../base/label/components/web/Label';

/**
 * Displays the Focus (jitsi-control) version serving the current conference,
 * when known. Renders nothing when the value is absent.
 *
 * @returns {ReactElement|null}
 */
const FocusVersionLabel = () => {
    const { t } = useTranslation();
    const focusVersion = useSelector((state: IReduxState) => {
        const properties = state['features/base/conference'].properties;

        if (!properties || !('focus-version' in properties)) {
            return undefined;
        }

        const value = (properties as Record<string, unknown>)['focus-version'];

        return typeof value === 'string' && value ? value : undefined;
    });

    if (!focusVersion) {
        return null;
    }

    return (
        <Label text = { t('info.focusVersion', { version: focusVersion }) } />
    );
};

export default FocusVersionLabel;
