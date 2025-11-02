import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, CreditCard, BarChart3 } from 'lucide-react';
import { useSubscriptionsData } from '@/hooks/useSubscriptionsData';
import { SubscriptionForm } from '@/components/subscriptions/SubscriptionForm';
import { SubscriptionsList } from '@/components/subscriptions/SubscriptionsList';
import { SubscriptionAnalytics } from '@/components/subscriptions/SubscriptionAnalytics';
import { Subscription } from '@/hooks/useSubscriptionsData';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';

const Subscriptions: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { subscriptions, isLoading, addSubscription, updateSubscription, deleteSubscription } = useSubscriptionsData();
  const [showForm, setShowForm] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | undefined>(undefined);

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Sign in to manage your subscriptions</h1>
        <LoginForm />
      </div>
    );
  }

  const handleSubmit = async (data: Omit<Subscription, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (editingSubscription) {
      await updateSubscription.mutateAsync({ ...data, id: editingSubscription.id });
    } else {
      await addSubscription.mutateAsync(data);
    }
    setShowForm(false);
    setEditingSubscription(undefined);
  };

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await deleteSubscription.mutateAsync(id);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSubscription(undefined);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CreditCard className="h-8 w-8" />
            Subscription Manager
          </h1>
          <p className="text-muted-foreground mt-2">
            Track and manage all your subscriptions in one place
          </p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Subscription
          </Button>
        )}
      </div>

      {showForm ? (
        <SubscriptionForm
          subscription={editingSubscription}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="list">
              <CreditCard className="h-4 w-4 mr-2" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            <SubscriptionsList
              subscriptions={subscriptions}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <SubscriptionAnalytics subscriptions={subscriptions} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Subscriptions;