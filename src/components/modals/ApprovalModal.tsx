import React from 'react'
import { Modal, Tag, Text, View } from 'native-base';
import { SignClientTypes } from '@walletconnect/types';
import { StyleSheet } from 'react-native';
import { AcceptRejectButton } from '../AcceptRejectButton';
import { Events } from './modules/Events';
import { Methods } from './modules/Methods';
import { ModalHeader } from './modules/ModalHeader';

type Props = {
    proposal: SignClientTypes.EventArguments['session_proposal'];
    isOpen: boolean;
    onClose: () => void;
    handleAccept: () => void;
    handleReject: () => void;
}

export default function ApprovalModal({ proposal, isOpen, onClose, handleAccept, handleReject }: Props) {
    const name = proposal?.params?.proposer?.metadata?.name;
    const url = proposal?.params?.proposer?.metadata.url;
    const methods = proposal?.params?.requiredNamespaces.eip155.methods;
    const events = proposal?.params?.requiredNamespaces.eip155.events;
    const chains = proposal?.params?.requiredNamespaces.eip155.chains;
    const icon = proposal?.params.proposer.metadata.icons[0];

    return isOpen && (
        <Modal isOpen onClose={onClose}>
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <ModalHeader name={name} url={url} icon={icon} />

                    <View style={styles.divider} />
                    <Text style={styles.permissionsText}>REQUESTED PERMISSIONS:</Text>

                    <View style={styles.chainContainer}>
                        <View style={styles.flexRowWrapped}>
                            {chains?.map((chain: string, index: number) => {
                                return (
                                    <Tag key={index} value={chain.toUpperCase()} grey={true} />
                                );
                            })}
                        </View>

                        <Methods methods={methods} />
                        <Events events={events} />
                    </View>

                    <View style={styles.flexRow}>
                        <AcceptRejectButton accept={false} onPress={handleReject} />
                        <AcceptRejectButton accept={true} onPress={handleAccept} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
    },
    flexRowWrapped: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    modalContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 34,
        backgroundColor: 'rgba(242, 242, 247, 0.8)',
        width: '100%',
        paddingTop: 30,
        minHeight: '70%',
        position: 'absolute',
        bottom: 44,
    },
    permissionsText: {
        color: 'rgba(60, 60, 67, 0.6)',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        paddingBottom: 8,
    },
    chainContainer: {
        width: '90%',
        padding: 10,
        borderRadius: 25,
        backgroundColor: 'rgba(80, 80, 89, 0.1)',
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: 'rgba(60, 60, 67, 0.36)',
        marginVertical: 16,
    },
});