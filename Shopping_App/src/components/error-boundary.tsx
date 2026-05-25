import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CoveColors } from '@/constants/theme';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('Error caught by boundary:', error);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Oops! Something went wrong</Text>
            <Text style={styles.message}>
              We are sorry for the inconvenience. Please try again.
            </Text>
            {__DEV__ && (
              <Text style={styles.error}>{this.state.error?.message}</Text>
            )}
            <Pressable style={styles.button} onPress={this.resetError}>
              <Text style={styles.buttonText}>Try Again</Text>
            </Pressable>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CoveColors.background,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: CoveColors.textPrimary,
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: CoveColors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  error: {
    fontSize: 12,
    color: '#FF4444',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'monospace',
    padding: 8,
    backgroundColor: '#FFE4E4',
    borderRadius: 4,
  },
  button: {
    backgroundColor: CoveColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
