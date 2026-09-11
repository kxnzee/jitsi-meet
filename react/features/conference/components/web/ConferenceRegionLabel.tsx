import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { IReduxState } from '../../../app/types';
import Label from '../../../base/label/components/web/Label';
import { COLORS } from '../../../base/label/constants';

/**
 * Displays the focus region captured when the conference was created.
 *
 * @returns {JSX.Element|null}
 */
const ConferenceRegionLabel = () => {
    const conference = useSelector((state: IReduxState) => state['features/base/conference'].conference);
    const { t } = useTranslation();
    const region = conference?.getFocusRegion?.();

    if (typeof region !== 'string' || region.length === 0) {
        return null;
    }

    const text = t('info.conferenceRegion', { region });

    return (
        <Label
            color = { COLORS.white }
            id = 'conferenceRegionLabel'
            text = { text } />
    );
};

export default ConferenceRegionLabel;
