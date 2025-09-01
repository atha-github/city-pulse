import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CColor from '../../utils/CColor';
import CFont from '../../utils/CFont';

interface CAlertModalProps {
  visible: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CAlertModal: React.FC<CAlertModalProps> = ({
  visible,
  title = 'Confirm',
  message,
  confirmText = 'Yes',
  cancelText = 'No',
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: CColor.white,
    borderRadius: CFont.s(12),
    padding: CFont.s(24),
    alignItems: 'center',
    shadowColor: CColor.black,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: CFont.s(20),
    fontWeight: 'bold',
    marginBottom: CFont.s(12),
    color: CColor.black,
    textAlign: 'center',
  },
  message: {
    fontSize: CFont.s(16),
    color: CColor.darkGray,
    marginBottom: CFont.s(24),
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    marginRight: CFont.s(8),
    paddingVertical: CFont.s(10),
    borderRadius: CFont.s(8),
    backgroundColor: CColor.lightGray,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    marginLeft: CFont.s(8),
    paddingVertical: CFont.s(10),
    borderRadius: CFont.s(8),
    backgroundColor: CColor.red,
    alignItems: 'center',
  },
  cancelText: {
    color: CColor.black,
    fontWeight: '600',
    fontSize: CFont.s(16),
  },
  confirmText: {
    color: CColor.white,
    fontWeight: '600',
    fontSize: CFont.s(16),
  },
});

export default CAlertModal;
